import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../component/Logo";
import { useEffect, useRef, useState } from "react";
import { useAppBarHei, useToken, useUser } from "../hooks/AppContext";
import { Loader1 } from "../component/Loader";

const commonPages = [{ name: "Home", path: "/" }];
const adminPages = [
  { name: "Accounts", path: "/accounts" },
  { name: "Articles", path: "/create-articles" },
  { name: "Collecting Places", path: "/create-collecting" },
];
const gtfPages = [{ name: "GTF", path: "/gtf" }];
const csPages = [{ name: "CS", path: "/cs" }];
const gcPages = [{ name: "GC", path: "/gc" }];
const settings = [
  { name: "Profile", path: "/profile" },
  { name: "Logout", path: "/logout" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const token = useToken();
  const { user, error, loading } = useUser();
  const { setHeight } = useAppBarHei();
  const appBarRef = useRef(null);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [pages, setPages] = useState([...commonPages]);

  useEffect(() => {
    setHeight(appBarRef.current.clientHeight);
    if (!token || !user) return setPages([...commonPages]);
    if (loading) return;
    if (error) alert("Error Getting User details");

    if (user.role === "admin") {
      setPages([...commonPages, ...adminPages]);
    } else if (user.role === "gtf") {
      setPages([...commonPages, ...gtfPages]);
    } else if (user.role === "cs") {
      setPages([...commonPages, ...csPages]);
    } else if (user.role === "gc") {
      setPages([...commonPages, ...gcPages]);
    }
  }, [token, loading, error, user, setHeight]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="static" ref={appBarRef}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo role={user?.role} />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link
                    to={page.path}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Logo mobile={true} role={user?.role} />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                style={{ textDecoration: "none" }}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  to={page.path}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {page.name}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {token ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {loading ? (
                      <Loader1 />
                    ) : (
                      <Avatar alt={user?.name} src={user?.picture} />
                    )}
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {/* Menu items */}
                  <Typography textAlign="center">
                    {loading ? "Loading" : user?.name}
                  </Typography>
                  {settings.map((setting) => (
                    <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                      <Link
                        to={setting.path}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Typography textAlign="center">
                          {setting.name}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <MenuItem onClick={() => navigate("/login")}>
                <Typography textAlign="center">Login/Register</Typography>
              </MenuItem>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
