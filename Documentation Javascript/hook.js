export function which_hook(brand) {
    if ((brand == 'Rolex') || (brand == 'ROLEX') || (brand == 'rolex')) {
        const hook = 'https://discord.com/api/webhooks/847420865242988554/kzUAMH1yxSOkAmMZTOJp7iFkD2ZFx_7vcdFYlZlseHHfSBAhi4TZ-K5AsKMrbSYFwyZH';
        return hook;
    } else if ((brand == 'Tudor') || (brand == 'TUDOR') || (brand == 'tudor')) {
        const hook = 'https://discord.com/api/webhooks/847428900531077150/85zWpAvKuRE5X_G_kkU1U0k1WdWCKyL6SObdZGBgjphbJDE8MI5RsY0JxNCMY9pzmtKi';
        return hook;
    } else if ((brand == 'Zenith') || (brand == "Zénith") || (brand == 'ZENITH') || (brand == 'zenith')) {
        const hook = 'https://discord.com/api/webhooks/855020106895720459/RLcNETtK4ndg1z--w1w9C6HO904tQ5kasKLehb1K6n2EeCjx8guJOWWO9y_uVWatT5pu';
        return hook;
    } else if ((brand == 'Breitling') || (brand == "BREITLING") || (brand == 'breitling')) {
        const hook = 'https://discord.com/api/webhooks/855019921745248257/HvOTssEnG3V2W91xMNXY649QruGVhOX7n0t2PcrBws69Fx_6ppxxrCKgsIPONDD60F8S';
        return hook;
    } else if ((brand == 'Tag Heuer') || (brand == "TAG HEUER") || (brand == 'tag heuer')) {
        const hook = 'https://discord.com/api/webhooks/855019757966589973/Xqq74ry0t7qDtGe9wAaNisZoYgLr8hdVlfX00AtdNwiiDVk9j6GiXwIIe5jrBw7Ve4XJ';
        return hook;
    } else if ((brand == 'Bell&Ross') || (brand == "BELL&ROSS") || (brand == 'Bell') || (brand == 'BELL') || (brand == "ROSS") || (brand == 'ross') || (brand == 'bell&ross')) {
        const hook = 'https://discord.com/api/webhooks/855019862556016671/gtUhT3WROnKH0ESZuaA9lz9RYK3VlqFpDYufi9VQ-Lxx0zHjrtZ7nxTElpYWDPzEGGmX';
        return hook;
    } else if ((brand == 'Patek Philippe') || (brand == "Patek") || (brand == 'PATEK PHILIPPE') || (brand == 'patek philippe')) {
        const hook = 'https://discord.com/api/webhooks/855019692254691368/w4_s2ZFzXwkyWXERJ_Kid2vBK9HOV1F6lhmaeaUg9GGJs8WDOmNKOcMP63pwu_8dT4v_';
        return hook;
    } else if ((brand == 'Omega') || (brand == "Oméga") || (brand == 'OMEGA') || (brand == 'omega')) {
        const hook = 'https://discord.com/api/webhooks/855020061197860925/62ATmuH_clXPg3i1s_x18C6ouzIsKaxPx9NBoT6gYp0_XrFET7j5aq7zVLsRS5MZA1B5';
        return hook;
    } else if ((brand == 'Audemars Piguet') || (brand == "Audemars") || (brand == 'Piguet') || (brand == 'AUDEMARS PIGUET') || (brand == 'audemars piguet')) {
        const hook = 'https://discord.com/api/webhooks/855019622817071114/itIVOUOxzkjwCdOeAujwN3EusiDlgDOSmgbMKM4tgAy9r8gjZwwqqe0jJ_WLbgmE1Ze6';
        return hook;
    } else {
        return 2;
    }
};
let brands = ['Tudor', 'TUDOR', 'tudor',
                'Zenith', "Zénith", 'ZENITH', 'zenith',
                'Rolex', 'ROLEX', 'rolex',
                'Breitling', 'BREITLING', 'breitling',
                'Tag Heuer', 'TAG HEUER', 'tag heuer',
                'Bell&Ross', 'BELL&ROSS', 'Bell', 'BELL', 'ROSS', 'ross', 'bell&ross',
                'Omega', "Oméga", 'OMEGA', 'omega',
                'Patek Philippe', 'Patek', 'PATEK PHILIPPE', 'patek philippe',
                'Audemars Piguet', 'Audemars', 'Piguet', 'AUDEMARS PIGUET', 'audemars piguet'];
//If the brand correspond it returns the specific hook (string). Else, it returns 2 (number);
