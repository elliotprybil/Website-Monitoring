// Javascript cares about the capital letters

let brands = ['Tudor', 'TUDOR', 'tudor',
                'Zenith', "Zénith", 'ZENITH', 'zenith',
                'Rolex', 'ROLEX', 'rolex',
                'Breitling', 'BREITLING', 'breitling',
                'Tag Heuer', 'TAG HEUER', 'tag heuer',
                'Bell&Ross', 'BELL&ROSS', 'Bell', 'BELL', 'ROSS', 'ross', 'bell&ross',
                'Omega', "Oméga", 'OMEGA', 'omega',
                'Patek Philippe', 'Patek', 'PATEK PHILIPPE', 'patek philippe',
                'Audemars Piguet', 'Audemars', 'Piguet', 'AUDEMARS PIGUET', 'audemars piguet'];

export function brandChecking (title) {
    let list = title.split(' ');
    for (let i in brands) {
        if (list.includes(brands[i])) {
            let brand = brands[i];
            return brand;
        };
    };
    return 2;
};