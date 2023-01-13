let dictionary = {"Blackbay 58 Blue Navy 79030B": "3400", "Blackbay 58 Black 79030N": "3250", "Blackbay GMT 79830RB": "3700", "Blackbay 58 925 79010SG": "4400", "Blackbay 58 Bronze 79012M": "4650", "Blackbay Chrono 79360N": "5400", //Tudor
                "Defy Classic Blue 95.9000.670 51.R790": "4200", // Zenith
                "Submariner 14060": "9500", "Submariner Date 16610": "10750", "Submariner Date Kermit 16610LV": "16700", "Submariner ref 114060": "10750", "Submariner Date ref 116610": "12500", "Submariner Date ref 116610LV": "16700", "Submariner ref 124060": "12000", "Submariner Date ref 126610": "12500", "Submariner Date Starbuck 126610LV": "16700", "GMT Master II Coke 16710": "11900", "GMT Master II Pepsi 16710": "14300", "GMT Master II lunette noire 116710": "12000", "GMT Master II Pepsi 116710": "16100", "GMT Master II Batman 126710BLNR": "13100", "GMT Master II Rootbeer 126711CHNR": "17900", "Datejust Turn-O-Graph 116264": "6000", "Datejust 126234": "11500", "Datejust 126300 ": "9200", "Oyster Perpetual 124300": "7750", "Oyster Perpetual 126000": "7200", "Skydweller 326934": "17900", "Daytona 116500LN": "20200", "SeaDweller DeepSea 126660": "15400", "SeaDweller 126600": "13700", "Explorer 214270": "7600", "Explorer II 216570": "10950", "Explorer II 226570": "11070", "Milgauss 116400GV": "10119", "Air-King 116900": "7619", // Rolex
                "Superocean Heritage '57 A10370121B1A1": "3571", "Superocean Heritage '57 Limited Edition II Rainbow A103702A1C1A1": "6547", "Breitling Top Time Deus Limited Edition A233101A1A1X1": "6666", // Breitling
                "Monaco CBL2111.FC6453": "4761", "Monaco CAW211P.FC6356": "4642", // Tag Heuer
                "BR-05 BR05A-BL-ST/SST": "3810", "BR-05 BR05A-BLU-ST/SST": "3571", "BR-05 BR05C-BL-ST/SST": "4523", "BR-05 BR05C-BU-ST/SST": "4523", // Bell&Ross
                "Nautilus 5711": "113000", "Nautilus 5712": "107000", "Nautilus 5726": "71400", "Nautilus 5980": "226100", "Nautilus 5740": "226100", "Aquanaut 5167": "53571", "Aquanaut 5168": "53500", "Aquanaut 5164": "77380", "Aquanaut 5968": "113095",  // Patek Philippe
                "Royal Oak 15500": "27380", "Royal Oak 15202": "29761", // Audemars Piguet
                };


export function verify_criterias(title, price) {
    const parsing_price = price.replace('$', '').replace(',', '').replace(' ', '');
    const price_int = parseInt(parsing_price);
    for (let key in dictionary) {
        let counter = 0;
        let list = key.split(" "), length = list.length;
        list.forEach(function(item) { 
            if (title.includes(item)) {
                counter = counter + 1;
            }});
            if (counter === length) {
                let prix = parseInt(dictionary[key]);
                if (price_int <= prix) {
                    return 1;
                    ;
                } else {
                    return 2;
                };
            };
    };
    return 2
};

// If the price and the name correspond, will return 1 (number). Else, will return 2 (number)