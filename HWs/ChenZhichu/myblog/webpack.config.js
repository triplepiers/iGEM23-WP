module.exports = {
    //此部分
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.md$/,
                    use: ["text-loader"]
                }
            ]
        }
    }
};


// module.exports = {   
//     configureWebpack: {
//         module: {
//             rules: [
//                 {
//                     test: /\.md$/,
//                     use: ["text-loader"]
//                 }
//             ]
//         }
//     }
// };

