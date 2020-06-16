var initNum = () => {
    return {
        step1: { r1: { c1: { value: 0, click: false } } },
        step2: {
            r1: { c1: { value: 1, click: false }, c2: { value: 1, click: false } },
            r2: { c1: { value: 1, click: false }, c2: { value: 1, click: false } },
        },
        step3: {
            r1: { c1: { value: 0, click: false }, c2: { value: 0, click: false }, c3: { value: 0, click: false } },
            r2: { c1: { value: 0, click: false }, c2: { value: 0, click: false }, c3: { value: 0, click: false } },
            r3: { c1: { value: 0, click: false }, c2: { value: 0, click: false }, c3: { value: 0, click: false }, }
        },
        step4: {
            r1: { c1: { value: 1, click: false }, c2: { value: 1, click: false }, c3: { value: 1, click: false }, c4: { value: 1, click: false } },
            r2: { c1: { value: 1, click: false }, c2: { value: 1, click: false }, c3: { value: 1, click: false }, c4: { value: 1, click: false } },
            r3: { c1: { value: 1, click: false }, c2: { value: 1, click: false }, c3: { value: 1, click: false }, c4: { value: 1, click: false } },
            r4: { c1: { value: 1, click: false }, c2: { value: 1, click: false }, c3: { value: 1, click: false }, c4: { value: 1, click: false } },
        },
        step5: {
            r1: { c1: { value: 0, click: false }, c2: { value: 0, click: false }, c3: { value: 0, click: false }, c4: { value: 0, click: false }, c5: { value: 0, click: false } },
            r2: { c1: { value: 0, click: false }, c2: { value: 0, click: false }, c3: { value: 0, click: false }, c4: { value: 0, click: false }, c5: { value: 0, click: false } },
            r3: { c1: { value: 0, click: false }, c2: { value: 0, click: false }, c3: { value: 0, click: false }, c4: { value: 0, click: false }, c5: { value: 0, click: false } },
            r4: { c1: { value: 0, click: false }, c2: { value: 0, click: false }, c3: { value: 0, click: false }, c4: { value: 0, click: false }, c5: { value: 0, click: false } },
            r5: { c1: { value: 0, click: false }, c2: { value: 0, click: false }, c3: { value: 0, click: false }, c4: { value: 0, click: false }, c5: { value: 0, click: false } },
        },
    };
}

const getStep = function(s) {
    switch (s) {
        case 1:
            return app.n.step1;
        case 2:
            return app.n.step2;
        case 3:
            return app.n.step3;
        case 4:
            return app.n.step4;
        case 5:
            return app.n.step5;
    }
}
const getRow = function(step, r) {
    switch (r) {
        case 1:
            return step.r1;
        case 2:
            return step.r2;
        case 3:
            return step.r3;
        case 4:
            return step.r4;
        case 5:
            return step.r5;
    }
}
const getColumn = function(row, c) {
    switch (c) {
        case 1:
            return row.c1;
        case 2:
            return row.c2;
        case 3:
            return row.c3;
        case 4:
            return row.c4;
        case 5:
            return row.c5;
    }
}
const getBit = function(s, r, c) {
    return getColumn(getRow(getStep(s), r), c);
}

const right = function(s, r, c) {
    // s = 列数
    // 右端と右から2番目の列だったら何もしない
    if (s - c < 2) { return; }
    // 自身の右隣の色が同じだったら何もしない
    if (getBit(s, r, c + 1).value === app.currentColor) { return; }
    // 初回は自身の二つ隣（右隣は違う色が確定してる）
    // 自身の二つ右隣以降に今の色と同じ色があるか
    let tc = c + 2;
    let existc = false;
    while (tc <= s) {
        if (getBit(s, r, tc).value === app.currentColor) {
            existc = true;
            break;
        }
        tc++;
    }
    // 挟むのに成功しているので裏返す
    if (!existc) {
        return;
    }

    tc = c + 1;
    while (tc < s) {
        let tcc = getBit(s, r, tc);
        if (tcc.value === app.currentColor) {
            return;
        }
        tcc.value = app.currentColor;
        tc++;
    }
}
const left = function(s, r, c) {
    // 1列目2列目の場合何もしない
    if (c === 1 || c === 2) { return; }
    // 自身の左隣が同色の場合何もしない
    if (getBit(s, r, c - 1).value === app.currentColor) { return; }
    let tc = c - 2;
    let existc = false;
    while (tc > 0) {
        if (getBit(s, r, tc).value === app.currentColor) {
            existc = true;
            break;
        }
        tc--;
    }
    if (!existc) {
        return;
    }
    tc = c - 1;
    while (tc > 0) {
        let tcc = getBit(s, r, tc);
        if (tcc.value === app.currentColor) {
            return;
        }
        tcc.value = app.currentColor;
        tc--;
    }
}
const up = function(s, r, c) {
    if (r === 1 || r === 2) { return; }
    if (getBit(s, r - 1, c).value === app.currentColor) { return; }
    let tr = r - 2;
    let existx = false;
    while (tr > 0) {
        if (getBit(s, tr, c).value === app.currentColor) {
            existx = tr;
            break;
        }
        tr--;
    }
    if (!existx) {
        return;
    }
    tr = r - 1;
    while (tr > 0) {
        let tcc = getBit(s, tr, c);
        if (tcc.value === app.currentColor) {
            return;
        }
        tcc.value = app.currentColor;
        tr--;
    }
}
const down = function(s, r, c) {
    if (s - r < 2) { return; }
    if (getBit(s, r + 1, c).value === app.currentColor) { return; }
    let tr = r + 2;
    let existx = false;
    while (tr <= s) {
        if (getBit(s, tr, c).value === app.currentColor) {
            existx = tr;
            break;
        }
        tr++;
    }
    if (!existx) {
        return;
    }
    tr = r + 1;
    while (tr <= s) {
        let tcc = getBit(s, tr, c);
        if (tcc.value === app.currentColor) {
            return;
        }
        tcc.value = app.currentColor;
        tr++;
    }
}
const rightup = function(s, r, c) {
    if ((s - c) < 2) { return; }
    if (r === 1 || r === 2) { return; }
    if (getBit(s, r - 1, c + 1).value === app.currentColor) { return; }
    let tmpr = r - 2;
    let tmpc = c + 2;
    let existColorCell = false;
    while (tmpr > 0 && tmpc <= s) {
        if (getBit(s, tmpr, tmpc).value === app.currentColor) {
            existColorCell = true;
            break;
        }
        tmpr--;
        tmpc++;
    }
    if (!existColorCell) { return; }
    tmpr = r - 1;
    tmpc = c + 1;
    while (tmpr > 0 && tmpc <= s) {
        let tmpcell = getBit(s, tmpr, tmpc);
        if (tmpcell.value === app.currentColor) { return; }
        tmpcell.value = app.currentColor;
        tmpr--;
        tmpc++;
    }
}
const rightdown = function(s, r, c) {
    if (s - c < 2) { return; }
    if (s - r < 2) { return; }
    if (getBit(s, r + 1, c + 1).value === app.currentColor) { return; }
    let tmpr = r + 2;
    let tmpc = c + 2;
    let existColorCell = false;
    while (tmpr <= s && tmpc <= s) {
        if (getBit(s, tmpr, tmpc).value === app.currentColor) {
            existColorCell = true;
            break;
        }
        tmpr++;
        tmpc++;
    }
    if (!existColorCell) { return; }
    tmpr = r + 1;
    tmpc = c + 1;
    while (tmpr <= s && tmpc <= s) {
        let tmpcell = getBit(s, tmpr, tmpc);
        if (tmpcell.value === app.currentColor) { return; }
        tmpcell.value = app.currentColor;
        tmpr++;
        tmpc++;
    }
}
const leftup = function(s, r, c) {
    if (c === 1 || c === 2) { return; }
    if (r === 1 || r === 2) { return; }
    if (getBit(s, r - 1, c - 1).value === app.currentColor) { return; }
    let tmpr = r - 2;
    let tmpc = c - 2;
    let existColorCell = false;
    while (tmpr > 0 && tmpc > 0) {
        if (getBit(s, tmpr, tmpc).value === app.currentColor) {
            existColorCell = true;
            break;
        }
        tmpr--;
        tmpc--;
    }
    if (!existColorCell) { return; }
    tmpr = r - 1;
    tmpc = c - 1;
    while (tmpr > 0 && tmpc > 0) {
        let tmpcell = getBit(s, tmpr, tmpc);
        if (tmpcell.value === app.currentColor) { return; }
        tmpcell.value = app.currentColor;
        tmpr--;
        tmpc--;
    }
}
const leftdown = function(s, r, c) {
    if (c === 1 || c === 2) { return; }
    if (s - r < 2) { return; }
    if (getBit(s, r + 1, c - 1).value === app.currentColor) { return; }
    let tmpr = r + 2;
    let tmpc = c - 2;
    let existColorCell = false;
    while (tmpr <= s && tmpc > 0) {
        if (getBit(s, tmpr, tmpc).value === app.currentColor) {
            existColorCell = true;
            break;
        }
        tmpr++;
        tmpc--;
    }
    if (!existColorCell) { return; }
    tmpr = r + 1;
    tmpc = c - 1;
    while (tmpr <= s && tmpc > 0) {
        let tmpcell = getBit(s, tmpr, tmpc);
        if (tmpcell.value === app.currentColor) { return; }
        tmpcell.value = app.currentColor;
        tmpr++;
        tmpc--;
    }
}

const goDown111_533 = function(s, r, c) {
    // 1-1-1 3-2-2 5-3-3
    if (s !== 1) { return; }
    if (getBit(3, 2, 2).value === app.currentColor) { return; }
    if (getBit(5, 3, 3).value !== app.currentColor) { return; }
    getBit(3, 2, 2).value = app.currentColor;
}
const goDown111_513 = function(s, r, c) {
    // 1-1-1 3-1-2 5-1-3
    if (s !== 1) { return; }
    if (getBit(3, 1, 2).value === app.currentColor) { return; }
    if (getBit(5, 1, 3).value !== app.currentColor) { return; }
    getBit(3, 1, 2).value = app.currentColor;
}
const goDown111_535 = function(s, r, c) {
    // 1-1-1 3-2-3 5-3-5
    if (s !== 1) { return; }
    if (getBit(3, 2, 3).value === app.currentColor) { return; }
    if (getBit(5, 3, 5).value !== app.currentColor) { return; }
    getBit(3, 2, 3).value = app.currentColor;
}
const goDown111_553 = function(s, r, c) {
    // 1-1-1 3-3-2 5-5-3
    if (s !== 1) { return; }
    if (getBit(3, 3, 2).value === app.currentColor) { return; }
    if (getBit(5, 5, 3).value !== app.currentColor) { return; }
    getBit(3, 3, 2).value = app.currentColor;
}
const goDown111_531 = function(s, r, c) {
    // 1-1-1 3-2-1 5-3-1
    if (s !== 1) { return; }
    if (getBit(3, 2, 1).value === app.currentColor) { return; }
    if (getBit(5, 3, 1).value !== app.currentColor) { return; }
    getBit(3, 2, 1).value = app.currentColor;
}
const upperStep_533_only = function(s, r, c) {
    if (s !== 5 || r !== 3 || c !== 3) { return; }
    if (getBit(3, 2, 2).value === app.currentColor) { return; }
    if (getBit(1, 1, 1).value !== app.currentColor) { return; }
    getBit(3, 2, 2).value = app.currentColor;
}

const goDownS = function(s, r, c) {
    // sが+1
    if (getBit(s + 1, r, c).value === app.currentColor) { return; }
    let tmps = s + 2;
    let existColorCell = false;
    while (tmps <= 5) {
        if (getBit(tmps, r, c).value === app.currentColor) {
            existColorCell = true;
            break;
        }
        tmps++;
    }
    if (!existColorCell) { return; }
    tmps = s + 1;
    while (tmps <= 5) {
        let tmpcell = getBit(tmps, r, c);
        if (tmpcell.value === app.currentColor) { return; }
        tmpcell.value = app.currentColor;
        tmps++;
    }
}
const goDownSC = function(s, r, c) {
    // sとcが+1
    if (getBit(s + 1, r, c + 1).value === app.currentColor) { return; }
    let tmps = s + 2;
    let tmpc = c + 2;
    let existColorCell = false;
    while (tmps <= 5) {
        if (getBit(tmps, r, tmpc).value === app.currentColor) {
            existColorCell = true;
            break;
        }
        tmps++;
        tmpc++;
    }
    if (!existColorCell) { return; }
    tmps = s + 1;
    tmpc = c + 1;
    while (tmps <= 5) {
        let tmpcell = getBit(tmps, r, tmpc);
        if (tmpcell.value === app.currentColor) { return; }
        tmpcell.value = app.currentColor;
        tmps++;
        tmpc++;
    }
}
const goDownSR = function(s, r, c) {
    // sとrが+1
    if (getBit(s + 1, r + 1, c).value === app.currentColor) { return; }
    let tmps = s + 2;
    let tmpr = r + 2;
    let existColorCell = false;
    while (tmps <= 5) {
        if (getBit(tmps, tmpr, c).value === app.currentColor) {
            existColorCell = true;
            break;
        }
        tmps++;
        tmpr++;
    }
    if (!existColorCell) { return; }
    tmps = s + 1;
    tmpr = r + 1;
    while (tmps <= 5) {
        let tmpcell = getBit(tmps, tmpr, c);
        if (tmpcell.value === app.currentColor) { return; }
        tmpcell.value = app.currentColor;
        tmps++;
        tmpr++;
    }
}
const goDownSRC = function(s, r, c) {
    // sとrとcが+1
    if (getBit(s + 1, r + 1, c + 1).value === app.currentColor) { return; }
    let tmps = s + 2;
    let tmpr = r + 2;
    let tmpc = c + 2;
    let existColorCell = false;
    while (tmps <= 5) {
        if (getBit(tmps, tmpr, tmpc).value === app.currentColor) {
            existColorCell = true;
            break;
        }
        tmps++;
        tmpr++;
        tmpc++;
    }
    if (!existColorCell) { return; }
    tmps = s + 1;
    tmpr = r + 1;
    tmpc = c + 1;
    while (tmps <= 5) {
        let tmpcell = getBit(tmps, tmpr, tmpc);
        if (tmpcell.value === app.currentColor) { return; }
        tmpcell.value = app.currentColor;
        tmps++;
        tmpr++;
        tmpc++;
    }
}
const goUpS = function(s, r, c) {
    if (getBit(s - 1, r, c).value === app.currentColor) { return; }
    let tmps = s - 2;
    let existColorCell = false;
    while (tmps > 0 && tmps >= r && tmps >= c) {
        if (getBit(tmps, r, c).value === app.currentColor) {
            existColorCell = true;
            break;
        }
        tmps--;
    }
    if (!existColorCell) { return; }
    tmps = s - 1;
    while (tmps > 0 && tmps >= r && tmps >= c) {
        let tmpcell = getBit(tmps, r, c);
        if (tmpcell.value === app.currentColor) { return; }
        tmpcell.value = app.currentColor;
        tmps--;
    }
}
const goUpSC = function(s, r, c) {
    // ↗ 2-1-2 3-1-3 4-1-4 sc
    if (getBit(s - 1, r, c - 1).value === app.currentColor) { return; }
    let tmps = s - 2;
    let tmpc = c - 2;
    let existColorCell = false;
    while (tmps > 0 && tmpc > 0 && tmps >= r && tmps >= tmpc) {
        if (getBit(tmps, r, tmpc).value === app.currentColor) {
            existColorCell = true;
            break;
        }
        tmps--;
        tmpc--;
    }
    if (!existColorCell) { return; }
    tmps = s - 1;
    tmpc = c - 1;
    while (tmps > 0 && tmpc > 0 && tmps >= r && tmps >= tmpc) {
        let tmpcell = getBit(tmps, r, tmpc);
        if (tmpcell.value === app.currentColor) { return; }
        tmpcell.value = app.currentColor;
        tmps--;
        tmpc--;
    }
}
const goUpSR = function(s, r, c) {
    if (getBit(s - 1, r - 1, c).value === app.currentColor) { return; }
    let tmps = s - 2;
    let tmpr = r - 2;
    let existColorCell = false;
    while (tmps > 0 && tmpr > 0 && tmps >= c && tmps >= tmpr) {
        if (getBit(tmps, tmpr, c).value === app.currentColor) {
            existColorCell = true;
            break;
        }
        tmps--;
        tmpr--;
    }
    if (!existColorCell) { return; }
    tmps = s - 1;
    tmpr = r - 1;
    while (tmps > 0 && tmpr > 0 && tmps >= c && tmps >= tmpr) {
        let tmpcell = getBit(tmps, tmpr, c);
        if (tmpcell.value === app.currentColor) { return; }
        tmpcell.value = app.currentColor;
        tmps--;
        tmpr--;
    }
}
const goUpSRC = function(s, r, c) {
    if (getBit(s - 1, r - 1, c - 1).value === app.currentColor) { return; }
    let tmps = s - 2;
    let tmpr = r - 2;
    let tmpc = c - 2;
    let existColorCell = false;
    while (tmps > 0 && tmpr > 0 && tmpc > 0) {
        if (getBit(tmps, tmpr, tmpc).value === app.currentColor) {
            existColorCell = true;
            break;
        }
        tmps--;
        tmpr--;
        tmpc--;
    }
    if (!existColorCell) { return; }
    tmps = s - 1;
    tmpr = r - 1;
    tmpc = c - 1;
    while (tmps > 0 && tmpr > 0 && tmpc > 0) {
        let tmpcell = getBit(tmps, tmpr, tmpc);
        if (tmpcell.value === app.currentColor) { return; }
        tmpcell.value = app.currentColor;
        tmps--;
        tmpr--;
        tmpc--;
    }
}
const goUp513 = function(s, r, c) {
    // 5-1-3 3-1-2 1-1-1
    if (getBit(3, 1, 2).value === app.currentColor) { return; }
    if (getBit(1, 1, 1).value !== app.currentColor) { return; }
    getBit(3, 1, 2).value = app.currentColor;
}
const goUp531 = function(s, r, c) {
    // 5-3-1 3-2-1 1-1-1
    if (getBit(3, 2, 1).value === app.currentColor) { return; }
    if (getBit(1, 1, 1).value !== app.currentColor) { return; }
    getBit(3, 2, 1).value = app.currentColor;
}
const goUp535 = function(s, r, c) {
    // 5-3-5 3-2-3 1-1-1
    if (getBit(3, 2, 3).value === app.currentColor) { return; }
    if (getBit(1, 1, 1).value !== app.currentColor) { return; }
    getBit(3, 2, 3).value = app.currentColor;
}
const goUp553 = function(s, r, c) {
    // 5-5-3 3-3-2 1-1-1
    if (getBit(3, 3, 2).value === app.currentColor) { return; }
    if (getBit(1, 1, 1).value !== app.currentColor) { return; }
    getBit(3, 3, 2).value = app.currentColor;
}
const firstStep = function(s, r, c) {
    // 左上
    // 1-1-1 2-1-1 3-1-1 4-1-1
    goDownS(s, r, c);
    // 右上
    // 1-1-1 2-1-2 3-1-3 4-1-4
    goDownSC(s, r, c);
    // 左下
    // 1-1-1 2-2-1 3-3-1 4-4-1
    goDownSR(s, r, c);
    // 右下
    // 1-1-1 2-2-2 3-3-3 4-4-4
    goDownSRC(s, r, c);
    // 真下
    // 1-1-1 3-2-2 5-3-3
    goDown111_533(s, r, c);
    // 1-1-1 3-1-2 5-1-3
    goDown111_513(s, r, c);
    // 1-1-1 3-2-3 5-3-5
    goDown111_535(s, r, c);
    // 1-1-1 3-3-2 5-5-3
    goDown111_553(s, r, c);
    // 1-1-1 3-2-1 5-3-1
    goDown111_531(s, r, c);
}
const secondStep = function(s, r, c) {
    // 1セルにつき4方向
    // ↖ 2-1-1 3-1-1 4-1-1 : sが+1
    // ↗ 2-1-1 3-1-2 4-1-3 : sとcが+1
    // ↙ 2-1-1 3-2-1 4-3-1 : sとrが+1
    // ↘ 2-1-1 3-2-2 4-3-3 : sとrとcが+1

    // ↖ 2-1-2 3-1-2 4-1-2
    // ↗ 2-1-2 3-1-3 4-1-4
    // ↙ 2-1-2 3-2-2 4-3-2
    // ↘ 2-1-2 3-2-3 4-3-4

    // ↖ 2-2-1 3-2-1 4-2-1
    // ↗ 2-2-1 3-2-2 4-2-3
    // ↙ 2-2-1 3-3-1 4-4-1
    // ↘ 2-2-1 3-3-2 4-4-3

    // ↖ 2-2-2 3-2-2 4-2-2
    // ↗ 2-2-2 3-2-3 4-2-4
    // ↙ 2-2-2 3-3-2 4-4-2
    // ↘ 2-2-2 3-3-3 4-4-4

    goDownS(s, r, c);
    goDownSC(s, r, c);
    goDownSR(s, r, c);
    goDownSRC(s, r, c);
}
const thirdStep = function(s, r, c) {
    // 下方向
    // 3-1-1 4-1-1 5-1-1
    goDownS(s, r, c);
    goDownSC(s, r, c);
    goDownSR(s, r, c);
    goDownSRC(s, r, c);

    // 上方向
    // 3-1-1 2-1-1 1-1-1
    // 3-1-3 2-1-2 1-1-1
    // 3-3-1 2-2-1 1-1-1
    // 3-3-3 2-2-2 1-1-1

    if (r === 1 && c == 1) {
        goUpS(s, r, c);
    } else if (r === 1 && c == 3) {
        goUpSC(s, r, c);
    } else if (r === 3 && c == 1) {
        goUpSR(s, r, c);
    } else if (r === 3 && c == 3) {
        goUpSRC(s, r, c);
    }
}
const fourthStep = function(s, r, c) {
    // ↖ 2-1-1 3-1-1 4-1-1 : sが-1
    // ↗ 2-1-1 3-1-2 4-1-3 : sとcが-1
    // ↙ 2-1-1 3-2-1 4-3-1 : sとrが-1
    // ↘ 2-1-1 3-2-2 4-3-3 : sとrとcが-1

    // ↖ 2-1-2 3-1-2 4-1-2 s
    // ↗ 2-1-2 3-1-3 4-1-4 sc
    // ↙ 2-1-2 3-2-2 4-3-2 sr
    // ↘ 2-1-2 3-2-3 4-3-4 src

    // ↖ 2-2-1 3-2-1 4-2-1 s
    // ↗ 2-2-1 3-2-2 4-2-3 sc
    // ↙ 2-2-1 3-3-1 4-4-1 sr
    // ↘ 2-2-1 3-3-2 4-4-3 src

    // ↖ 2-2-2 3-2-2 4-2-2 s
    // ↗ 2-2-2 3-2-3 4-2-4 sc
    // ↙ 2-2-2 3-3-2 4-4-2 sr
    // ↘ 2-2-2 3-3-3 4-4-4 src
    if ((r === 1 && c === 1) || (r === 1 && c === 2) || (r === 2 && c === 1) || (r === 2 && c === 2)) {
        goUpS(s, r, c);
    }
    if ((r === 1 && c === 3) || (r === 1 && c === 4) || (r === 2 && c === 3) || (r === 2 && c === 4)) {
        goUpSC(s, r, c);
    }
    if ((r === 3 && c === 1) || (r === 3 && c === 2) || (r === 4 && c === 1) || (r === 4 && c === 2)) {
        goUpSR(s, r, c);
    }
    if ((r === 3 && c === 3) || (r === 3 && c === 4) || (r === 4 && c === 3) || (r === 4 && c === 4)) {
        goUpSRC(s, r, c);
    }
}
const fifthStep = function(s, r, c) {
    // 真上：5-3-3 3-2-2 1-1-1
    // upperStep_533_only(s, r, c);

    // 5-1-1 4-1-1 3-1-1 2-1-1 1-1-1    s
    // 5-1-2 4-1-2 3-1-2 2-1-2          s
    // 5-1-3 4-1-3 3-1-3                s
    // 5-1-3 4-1-2 3-1-1                sc
    // 5-1-4 4-1-3 3-1-2 2-1-1          sc
    // 5-1-5 4-1-4 3-1-3 2-1-2 1-1-1    sc
    // 5-2-1 4-2-1 3-2-1 2-2-1          s
    // 5-2-5 4-2-4 3-2-3 2-2-2          sc
    // 5-3-1 4-2-1 3-1-1                sr
    // 5-3-1 4-3-1 3-3-1                s
    // 5-3-5 4-2-4 3-1-3                src
    // 5-3-5 4-3-4 3-3-3                sc
    // 5-4-1 4-3-1 2-2-1                sr
    // 5-4-5 4-3-4 3-2-3 2-1-2          src
    // 5-5-1 4-4-1 3-3-1 2-2-1 1-1-1    sr
    // 5-5-2 4-4-2 3-3-2 2-2-2          sr
    // 5-5-3 4-4-2 3-3-1                src
    // 5-5-3 4-4-3 3-3-3                sr
    // 5-5-4 4-4-3 3-3-2 2-2-1          src
    // 5-5-5 4-4-4 3-3-3 2-2-2 1-1-1    src
    if ((r === 1 && c === 1) || (r === 1 && c === 2) || (r === 1 && c === 3) || (r === 2 && c === 1) || (r === 3 && c === 1)) {
        goUpS(s, r, c);
    }
    if ((r === 1 && c === 3) || (r === 1 && c === 4) || (r === 1 && c === 5) || (r === 2 && c === 5) || (r === 3 && c === 5)) {
        goUpSC(s, r, c);
    }
    if ((r === 3 && c === 1) || (r === 4 && c === 1) || (r === 5 && c === 1) || (r === 5 && c === 2) || (r === 5 && c === 3)) {
        goUpSR(s, r, c);
    }
    if ((r === 3 && c === 5) || (r === 4 && c === 5) || (r === 5 && c === 3) || (r === 5 && c === 4) || (r === 5 && c === 5)) {
        goUpSRC(s, r, c);
    }
    if (r === 1 && c === 3) {
        // 5-1-3 3-1-2 1-1-1
        goUp513(s, r, c);
    }
    if (r === 3 && c === 1) {
        // 5-3-1 3-2-1 1-1-1
        goUp531(s, r, c);
    }
    if (r === 3 && c === 5) {
        // 5-3-5 3-2-3 1-1-1
        goUp535(s, r, c);
    }
    if (r === 5 && c === 3) {
        // 5-5-3 3-3-2 1-1-1
        goUp553(s, r, c);
    }
}

const stepReverse = function(s, r, c) {
    switch (s) {
        case 1:
            firstStep(s, r, c);
            return;
        case 2:
            secondStep(s, r, c);
            return;
        case 3:
            thirdStep(s, r, c);
            return;
        case 4:
            fourthStep(s, r, c);
            return;
        case 5:
            fifthStep(s, r, c);
            return;
    }
}
const lo = function(s, r, c) {
    const targetCell = getBit(s, r, c);
    console.log(targetCell.value);
    if (targetCell.click) { return; }
    if (targetCell.value === app.currentColor) {
        console.log("same color");
        return;
    } else {
        targetCell.value = app.currentColor;
    }

    // 右方向のオセロ
    right(s, r, c);
    // 左方向のオセロ
    left(s, r, c);
    // 上方向のオセロ
    up(s, r, c);
    // 下方向のオセロ
    down(s, r, c);
    // 右上
    rightup(s, r, c);
    // 右下
    rightdown(s, r, c);
    // 左下
    leftup(s, r, c);
    // 左上
    leftdown(s, r, c);
    // 階層
    stepReverse(s, r, c);
    // 手番交代
    app.currentColor = 1 - app.currentColor;
    targetCell.click = true;
}

var app = new Vue({
    el: "#app",
    data: {
        n: initNum(),
        currentColor: 1,
        c: false
    },
    methods: {
        initialize: function() {
            this.n = initNum();
            this.c = false;
            this.currentColor = 1;
        },
        cn: function(event) {
            console.log(event.target.id);
            const target = event.target.id.split('_');
            const s = parseInt(target[0]);
            const r = parseInt(target[1]);
            const c = parseInt(target[2]);
            console.log(s, r, c);
            lo(s, r, c);
        },
        changecolor: function(event) {
            this.currentColor = 1 - this.currentColor;
        }
    },
    computed: {
        number: function() {
            const a = this.n;
            const s = Object.values(a);
            const s1 = s.flatMap(k => { return Object.values(k); });
            const aa = s1.flatMap(k => { return Object.values(k); }).filter(k => k.value === 1).length;
            return aa;
        }
    },
    watch: {
        n: {
            handler: function() {
                if (!this.c && this.number === 55) {
                    setTimeout(c, 50);
                    this.c = true;
                }
            },
            deep: true
        }
    }
});

var c = () => {
    alert("clear!");
}