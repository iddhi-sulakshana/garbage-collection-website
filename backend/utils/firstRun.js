const { Article } = require("../models/article");
const { Collecting } = require("../models/collecting");
const { User } = require("../models/user");
const { encrypt } = require("./hash");
module.exports = async () => {
    const user = await User.findOne({ role: "admin" });
    if (!user) {
        const password = await encrypt("12345");
        const admin = new User({
            name: "Web Master",
            email: "admin@cmc.lk",
            phone: "0712345678",
            address: "Colombo",
            role: "admin",
            password,
        });
        try {
            await admin.save();
        } catch (ex) {
            console.log(ex);
        }

        // create users list
        const users = [
            {
                name: "Captain 1",
                email: "captain@cmc.lk",
                phone: "0781940178",
                address: "488/35a, 3rd Lane",
                role: "gc",
                password:
                    "$2b$10$Di42JezuX3VXM7KZUCtrse4/9EJKulQHxaoBQbgs01NdslIhtFMcG",
            },
            {
                name: "asd asd asd",
                email: "cleaning@gmail.com",
                phone: "1234567890",
                address: "asdsadasd",
                role: "cs",
                password:
                    "$2b$10$HWXeIw6au6BSnNEp.wvXPOWw2UyTjOTjeaYYiahsCFJaQyA73hSFu",
            },
            {
                name: "asdaa asdaa",
                email: "cifabeb525@nitynote.com",
                phone: "1234567890",
                address: "markus@gmail.com",
                picture: "profile/default.png",
                role: "gtf",
                password:
                    "$2b$10$R003nUN6BfX/8sXxrOrCA.BwpcEOCyu1fHwYSjC97AFk7TkPUbpRK",
            },
        ];

        users.forEach(async (user) => {
            const newUser = new User(user);
            try {
                await newUser.save();
            } catch (ex) {
                console.log(ex);
            }
        });
    }

    let collectings = await Collecting.find();
    if (!collectings.length) {
        collectings = [
            {
                name: "Waste Management",
                location: {
                    lat: 6.93459790640713,
                    lng: 79.85399022216797,
                },
                description:
                    "UNDP’s behavioural experiment will reveal whether adequate infrastructure and public awareness has a notable impact on waste management practices. Up to 40 separation bins for plastic waste will be installed in several districts of both cities. In the pilot districts, UNDP will organize an educational campaign to inform people about the environmental and other benefits of waste sorting, while in the other districts, no additional information will be provided to the residents. Changes in household waste behaviour will be compared in both groups to measure the effectiveness of public awareness activities.",
                images: [
                    "collectings/66cdc57b158711dd456b45b5-0.jpeg",
                    "collectings/66cdc57b158711dd456b45b5-1.jpeg",
                ],
                picture: "collectings/66cdc57b158711dd456b45b5.jpeg",
            },
            {
                name: "Plant 2",
                location: {
                    lat: 6.918920329782359,
                    lng: 79.85433354492187,
                },
                description:
                    "UNDP’s behavioural experiment will reveal whether adequate infrastructure and public awareness has a notable impact on waste management practices. Up to 40 separation bins for plastic waste will be installed in several districts of both cities. In the pilot districts, UNDP will organize an educational campaign to inform people about the environmental and other benefits of waste sorting, while in the other districts, no additional information will be provided to the residents. Changes in household waste behaviour will be compared in both groups to measure the effectiveness of public awareness activities.",
                images: [
                    "collectings/66cdc5f2158711dd456b45c5-0.jpeg",
                    "collectings/66cdc5f2158711dd456b45c5-1.jpeg",
                    "collectings/66cdc5f2158711dd456b45c5-2.jpeg",
                ],
                picture: "collectings/66cdc5f2158711dd456b45c5.jpeg",
            },
        ];

        collectings.forEach(async (collecting) => {
            const newCollecting = new Collecting(collecting);
            try {
                await newCollecting.save();
            } catch (ex) {
                console.log(ex);
            }
        });
    }

    let articles = await Article.find();
    if (!articles.length) {
        articles = [
            {
                title: "Waste Manage Project",
                description:
                    "කොළඹ නගරය තුල ජනනය වන දිරාපත්වන කසල හා ප්‍රතිචක්‍රීකරණය කල නොහැකි කසල කෙලවරපිටිය පිහිටි Waste to Energy බලාගාරය වෙත යොමුකර එම කසල දහනය කිරීම මඟින් නිපදවෙන මෙගාවොට් 10ක විදුලිය ජාතික විදුලිබල පද්ධතිය වෙත ලබාදීම වර්තමානයේ සිදුකලද දිරන කසලවල පවතින අධික තෙතමනය හමුවේ බලාගාරයේ යන්ත්‍ර නිතර ක්‍රියාවිරහිතවීම් වලට ලක්වීම නිසා නාගරික කසල කළමනාකරණය සඳහා මෙම ක්‍රමවේදය තිරසර විසඳුමක් නොවන බව නිරීක්ෂණය වී ඇත.\r\n\r\n",
                picture: "articles/66cdc740a96ea7f12c5a7dcc.jpeg",
            },
            {
                title: "Aluminium Collection",
                description:
                    "මානව සම්පත් සංවර්ධන දෙපාර්තමේන්තුව සහ ඇලුමෙක්ස් පුද්ගලික සමාගම එක්ව ඇලුමිනියම් එකලස් කිරීම පිළිබඳ පුහණු වැඩසටහනක් අගෝස්තු මස 6 සහ 7 දෙදින මාදම්පිටිය කාර්මික පුහුණු මධ්‍යස්ථානයේදී සාර්ථකව පවත්වන ලදි.\r\n\r\nඒ සඳහා තාක්ෂණික නිලධාරීන්, කර්මාන්ත පරිපාලකවරුන් සහ කණිෂ්ඨ සේවකයින් පිරිසක් සහභාගී වූහ.",
                picture: "articles/66cdc75fa96ea7f12c5a7dd0.jpeg",
            },
        ];

        articles.forEach(async (article) => {
            const newArticle = new Article(article);
            try {
                await newArticle.save();
            } catch (ex) {
                console.log(ex);
            }
        });
    }
};
