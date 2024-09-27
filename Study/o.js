var CStats = {
    classData: [["Fighter", 0, [1, 1, 1, 0, 0, 1, 0, 0, 1, 1], [1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1], "Any", 2], ["Barbarian", 0, [1, 1, 1, 0, 0, 0, 1, 1, 0, 1], [1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1], "Any", 2], ["Rogue", 0, [1, 1, 1, 1, 1, 0, 0, 0, 1, 0], [1, 1, 1, 1, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1], "Light, Medium", 2], ["Magician", 0, [0, 0, 0, 1, 1, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1], "Light", 2], ["Guardian", 0, [0, 1, 0, 0, 0, 1, 1, 1, 1, 1], [0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 1, 1, 1], "Heavy", 2], ["Samurai", 1, [1, 0, 0, 1, 0, 1, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1], "Any", 3], ["Paladin", 2, [1, 1, 1, 0, 0, 1, 1, 1, 0, 1], [1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1], "Any", 3], ["Monk", 3, [0, 0, 0, 1, 1, 0, 0, 0, 1, 0], [1, 1, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1], "Light", 4], ["Ninja", 4, [1, 0, 0, 1, 0, 0, 0, 0, 1, 0], [1, 1, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1], "Light", 4], ["Warlock", 5, [0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1], "Light", 5], ["Headhunter", 6, [0, 0, 1, 0, 0, 0, 0, 1, 0, 0], [1, 1, 1, 1, 0, 0], [0, 0, 1, 0, 0, 1, 0, 0], "Light, Medium", 5], ["Alchemist", 7, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1], "Light", 6]]
};
function Char(t, e) {
    var s = {}
      , t = (null != e.x && (s.left = e.x + "px"),
    null != e.y && (s.top = e.y + "px"),
    this.o = CE("DIV", t, e.c, s),
    this.sex = e.sex || 1,
    this.i = e.id,
    e.s / (1 == this.sex ? 415.4 + 64.2 : 499.8))
      , s = (this.sc = t,
    this.size = e.s,
    this.d = e,
    this.classId = e.classId,
    this.eq = new Array(2),
    this.eqId = new Array(2),
    this.eqId[0] = this.eqId[1] = -1,
    this.y = e.y,
    this.ox = 0,
    this.oy = 54,
    e.hpm ? (this.meters = CE("div", this.o, "cMeters"),
    this.cName = CTD(this.meters, e.name, "cName"),
    this.setLevel(e.level),
    this.life = new Meter(this.meters,0,12,100,12,e.hp / e.hpm,e.hp + " / " + e.hpm,"lifeMeter"),
    this.mana = new Meter(this.meters,0,26,100,12,e.mp / e.mpm,e.mp + " / " + e.mpm,"manaMeter"),
    this.exp = new Meter(this.meters,0,40,100,12,1,"Lv","expMeter"),
    evt.addDropEvt(this.o, this.drop.bind(this)),
    this.y = e.y + this.oy) : (this.ox = 0,
    this.oy = 0),
    this.c = CE("div", this.o, "charImg"),
    e.hpm && (aE(this.c, evt.MD, this.down.bind(this)),
    aE(this.c, evt.MU, this.up.bind(this)),
    aE(this.c, "mouseout", this.up.bind(this)),
    aE(this.exp.o, "mouseover", this.ovExp.bind(this)),
    aE(this.exp.o, "mouseout", this.ouExp.bind(this))),
    svgs["cBody" + this.sex][0].split(" "));
    this.body = this.addPiece("svg/cBody" + this.sex + ".svg", s),
    s = svgs["c" + CStats.classData[e.classId][0] + this.sex][0].split(" "),
    this.cObj = this.addPiece("svg/c" + CStats.classData[e.classId][0] + this.sex + ".svg", s),
    this.setEquip(1, e.armor),
    this.setEquip(0, e.weapon),
    this.setPosition(2)
}
function Group(t, e, s) {
    this.objectives = 0,
    this.members = {},
    this.ids = new Array(5),
    this.Maze = [],
    this.MazeSeen = [],
    this.flags = t,
    this.name = s,
    this.pcShown = !0,
    this.d = 1,
    this.members[Plr.char] = {
        1: Plr.c[5],
        13: Plr.c[2],
        15: Plr.c[51]
    },
    this.setLeader(e),
    this.initCombatStats(Plr.char),
    Plr.c[41] || (Plr.c[41] = 0)
}
function Item(t, e, s, a, i) {
    this.o = CE("DIV", t, "itemBox");
    var t = (i = i || {}).w || Plr.itemW
      , t = (this.w = t,
    e[4])
      , o = e[5]
      , r = e[7]
      , l = e[6];
    s && (this.o.style.left = s + "px"),
    a && (this.o.style.top = a + "px"),
    this.x = s,
    this.y = a,
    this.icon = cS(this.o, {
        s: "svg/icon" + Items.icons[t][o] + ".svg"
    }),
    this.item = e,
    this.i = e[0],
    this.setEquipable(),
    this.hasQuantity = Items.hasQuantity(e),
    (this.hasQuantity || i.glyph) && (this.quantity = CTD(this.o, "", "iQnt ds2"),
    this.hasQuantity && this.setQuantity(e[8][16]),
    i.glyph) && (this.setGlyphDuration(null),
    this.glyph = setInterval(function(t) {
        this.setGlyphDuration()
    }
    .bind(this), 1e3)),
    i.noPrefix || (r && CTD(this.o, "+" + r, "iMag ds2"),
    CTD(this.o, Items.materials[5][l], "iQual ds2")),
    this.noDrag = i.noDrag,
    this.isDrop = i.isDrop,
    this.shiftClick = i.shiftClick,
    this.compareEQ = i.compareEQ,
    i.ctrlUse && !Items.isConsumable(e) && (i.ctrlUse = !1),
    this.ctrlUse = i.ctrlUse,
    this.ccB1 = i.ccB1,
    this.ccB2 = i.ccB2,
    this.ctrlCustom = i.ctrlCustom,
    i.noDrag && i.noHover || (this.o.className += " cp"),
    i.noHover || (aE(this.o, "mouseover", this.over.bind(this)),
    aE(this.o, "mouseout", this.out.bind(this))),
    (!i.noDrag || i.ctrlUse || i.ctrlCustom || i.isDrop) && aE(this.o, evt.MD, this.down.bind(this))
}
function ItemSlot(t, e) {
    this.o = CE("DIV", t, e.c || "itemSlotBox"),
    null != e.x ? this.o.style.left = e.x + "px" : null != e.r && (this.o.style.right = e.r + "px"),
    null != e.y && (this.o.style.top = e.y + "px"),
    (this.data = e).ctrlClear && aE(this.o, evt.MD, this.click.bind(this)),
    evt.addDropEvt(this.o, this.dropEvt.bind(this))
}
Char.prototype.drop = function(t) {
    t.useItem(this)
}
,
Char.prototype.ovExp = function(t) {
    this.tip || (this.tip = new Tip(this.o,t),
    this.i == Plr.char && this.tip.add("Experience: " + Plr.c[9] + " / " + 1e6 * Plr.c[6], "fcb"),
    Plr.g ? (Plr.g.tip = this.tip,
    Plr.g.openCombatStats(this.i)) : this.tip.finish())
}
,
Char.prototype.ouExp = function(t) {
    Plr.g && Plr.g.tip && (Plr.g.tip = null),
    this.tip && (this.tip = this.tip.del())
}
,
Char.prototype.setPosition = function(t, e) {
    for (var s = ["posFront", "posMiddle", "posBack"], a = 0; a < s.length; a++)
        a == t ? this.c.classList.add(s[a]) : this.c.classList.remove(s[a]);
    this.getXY(),
    this.pos = t,
    this.bPosL && this.o.removeChild(this.bPosL),
    this.bPosR && this.o.removeChild(this.bPosR),
    this.bPosL = this.bPosR = null,
    e && (t <= 1 && (this.bPosL = mSVG(this.o, {
        n: svgs.arrowL,
        c: "moveL",
        s: 12,
        cb: function(t) {
            njs.sendBytes(61, Gs.char.pos + 1)
        }
    })),
    1 <= t) && (this.bPosR = mSVG(this.o, {
        n: svgs.arrowR,
        c: "moveR",
        s: 12,
        cb: function(t) {
            njs.sendBytes(61, Gs.char.pos - 1)
        }
    }))
}
,
Char.prototype.getXY = function() {
    this.x = getRelPos(this.c, "offsetLeft"),
    this.y = getRelPos(this.c, "offsetTop")
}
,
Char.prototype.setLevel = function(t) {
    this.level = t
}
,
Char.prototype.setExp = function(t) {
    this.exp.set(t, "Lv " + this.level + " (" + Math.floor(100 * t) + " %)")
}
,
Char.prototype.setLife = function(t, e) {
    this.life.set(t / e, t + " / " + e)
}
,
Char.prototype.setMana = function(t, e) {
    this.mana.set(t / e, t + " / " + e)
}
,
Char.prototype.setSkill = function(t) {
    t ? this.skill = cS(this.o, {
        c: "charSkillIcon",
        s: "svg/icon" + Prof.skillIcons[t - 1] + ".svg",
        w: 16,
        h: 16
    }) : this.skill && (this.skill = this.skill.parentNode.removeChild(this.skill))
}
,
Char.prototype.down = function(t) {
    if (Plr.inCombat && Plr.target.set(t, -this.i, Cbt.clickAttack),
    Plr.isM)
        return eSP(t)
}
,
Char.prototype.stopTimer = function() {
    Plr.target.id == -this.i && Plr.target.set()
}
,
Char.prototype.up = function(t) {
    this.stopTimer()
}
,
Char.prototype.del = function() {
    this.removeParalyze(),
    this.o.parentNode.removeChild(this.o),
    this.stopTimer(),
    this.cObj = this.cName = this.meters = this.life = this.mana = this.exp = this.c = this.o = null
}
,
Char.prototype.addDmg = function(t, e, s, a, i) {
    dTDmg(t, rnd(0, 20) + this.x, rnd(0, this.size - 25) + this.y, e, s, a, i)
}
,
Char.prototype.setDisc = function(t) {
    t ? this.cName.classList.add("pDisc") : this.cName.classList.remove("pDisc")
}
,
Char.prototype.setEquip = function(t, e) {
    var s;
    this.eqId[t] != e && (-1 != this.eqId[t] && this.c.removeChild(this.eq[t]),
    -1 != (this.eqId[t] = e)) && (0 == t ? (s = svgs["wm" + e][0].split(" "),
    this.eq[t] = this.addPiece("svg/wm" + e + ".svg", s)) : (s = svgs["c" + Items.cArmors[e] + this.sex][0].split(" "),
    this.eq[t] = this.addPiece("svg/c" + Items.cArmors[e] + this.sex + ".svg", s),
    4 == e && (this.eq[t].style.opacity = .9)),
    1 == t) && -1 != this.eqId[0] && this.c.insertBefore(this.eq[1], this.eq[0])
}
,
Char.prototype.removeParalyze = function() {
    this.para && (this.c.removeChild(this.para),
    this.para = 0,
    this.tmParalyze) && (this.tmParalyze = clearTimeout(this.tmParalyze))
}
,
Char.prototype.doParalyze = function() {
    this.removeParalyze(),
    this.para = mSVG(this.c, {
        n: svgs.iconParalysis,
        s: 32,
        d: {
            left: "0px",
            top: "25px",
            position: "absolute"
        }
    });
    var t = this;
    this.tmParalyze = setTimeout(function() {
        t.tmParalyze = 0,
        t.removeParalyze()
    }, 1300)
}
,
Char.prototype.addPiece = function(t, e) {
    return cS(this.c, {
        s: t,
        w: e[2],
        h: e[3],
        d: {
            position: "absolute",
            left: e[0] * this.sc / (this.size / 2) * 100 + "%",
            top: e[1] * this.sc / this.size * 100 + "%",
            width: e[2] * this.sc / (this.size / 2) * 100 + "%",
            height: e[3] * this.sc / this.size * 100 + "%"
        }
    })
}
,
Char.isDead = function(t) {
    return 1 == Plr.chars[t][4] && Plr.chars[t][11]
}
,
Group.prototype.initCombatStats = function(t) {
    for (var e = 99; e <= 110; e++)
        this.members[t][e] = 0;
    this.members[t][101] = this.members[t][105] = -1,
    this.members[t][99] = Date.now()
}
,
Group.prototype.setLeader = function(t) {
    this.leaderId && this.members[this.leaderId] && this.members[this.leaderId][15].cName.classList.remove("gLeader"),
    this.members[t] && this.members[t][15].cName.classList.add("gLeader"),
    this.leaderId = t
}
,
Group.prototype.del = function() {
    for (var t in delete this.members[Plr.char],
    this.members)
        this.members[t][15].del(),
        this.members[t][15] = null,
        delete this.members[t];
    Gs.remEng()
}
,
Group.prototype.delPlayer = function(t) {
    this.members[t][15].del(),
    this.members[t][15] = null,
    delete this.members[t];
    for (var e = 0; e < 5; e++)
        if (this.ids[e] == t) {
            delete this.ids[e];
            break
        }
    for (e in this.members)
        this.members[e][15].getXY()
}
,
Group.prototype.addPlayer = function(t, e) {
    for (var s = 0, a = e[0]; this.ids[s]; )
        s++;
    return this.ids[s] = a,
    this.members[a] = e,
    this.members[a][15] = new Char(t,{
        c: "charObj",
        s: 80,
        id: a,
        classId: e[1],
        sex: e[8],
        weapon: e[9],
        armor: e[10],
        name: e[13],
        level: e[2],
        hp: e[3],
        hpm: e[4],
        mp: e[5],
        mpm: e[6]
    }),
    this.members[a][15].setExp(e[7] / 100),
    this.setPlayerPos(a),
    this.setPlayerLoc(a),
    this.initCombatStats(a),
    this.isLeader(a) && this.setLeader(a),
    a
}
,
Group.prototype.setEquip = function(t, e, s) {
    this.members[t][15].setEquip(e, s)
}
,
Group.prototype.setPlayerPos = function(t) {
    this.members[t][15].setPosition(this.members[t][11])
}
,
Group.prototype.redrawLocs = function() {
    for (var t in this.members)
        t != Plr.char && this.setPlayerLoc(t)
}
,
Group.prototype.isAPlayerIn = function(t) {
    for (var e in this.members)
        if (this.members[e][12] == t)
            return !0;
    return !1
}
,
Group.prototype.setPlayerLoc = function(t) {
    this.members[t][15].o.style.opacity = this.members[t][12] == Plr.c[41] ? 1 : .35
}
,
Group.prototype.setPlayerLife = function(t) {
    this.members[t][15].setLife(this.members[t][3], this.members[t][4])
}
,
Group.prototype.setPlayerMana = function(t) {
    this.members[t][15].setMana(this.members[t][5], this.members[t][6])
}
,
Group.prototype.setPlayerExp = function(t) {
    this.members[t][15].setExp(this.members[t][7] / 100)
}
,
Group.prototype.setSkilling = function(t, e) {
    this.members[t][15].setSkill(e)
}
,
Group.prototype.getFullName = function(t) {
    t = this.members[t];
    return t[13] + " [Level " + t[2] + " " + CStats.classData[t[1]][0] + "] " + Group.getGuildName(t[14])
}
,
Group.prototype.updateCombatStats = function(t, e, s) {
    t = Math.abs(t),
    isNaN(this.members[t][100]) && this.initCombatStats(t),
    -1 != s ? (++this.members[t][109],
    this.members[t][110] += s) : (++this.members[t][100],
    e < 0 ? (((e = Math.abs(e)) < this.members[t][105] || -1 == this.members[t][105]) && (this.members[t][105] = e),
    e > this.members[t][106] && (this.members[t][106] = e),
    this.members[t][107] += e,
    ++this.members[t][108]) : ((e < this.members[t][101] || -1 == this.members[t][101]) && (this.members[t][101] = e),
    e > this.members[t][102] && (this.members[t][102] = e),
    this.members[t][103] += e,
    ++this.members[t][104]))
}
,
Group.prototype.openCombatStats = function(t) {
    var e, s;
    t && (isNaN(this.members[t][100]) && this.initCombatStats(t),
    this.tip.add("Group Stats for " + this.members[t][13] + " (" + CStats.classData[this.members[t][1]][0] + ")", "fcb fwb"),
    this.tip.add("Total Actions (Dmg/Heal): " + this.members[t][100] + " (" + this.members[t][104] + " / " + this.members[t][108] + ")", "fcb"),
    s = this.members[t][101],
    this.tip.add("Total Damage (Min/Avg/Max): " + this.members[t][103] + " (" + (s = -1 == s ? 0 : s) + " / " + (this.members[t][104] ? Math.round(this.members[t][103] / this.members[t][104]) : 0) + " / " + this.members[t][102] + ")", "fcb"),
    s = this.members[t][105],
    this.tip.add("Total Heals (Min/Avg/Max): " + this.members[t][107] + " (" + (s = -1 == s ? 0 : s) + " / " + (this.members[t][108] ? Math.round(this.members[t][107] / this.members[t][108]) : 0) + " / " + this.members[t][106] + ")", "fcBlue"),
    this.tip.add("Hits Taken (Total Damage): " + this.members[t][109] + " (" + this.members[t][110] + ")", "fcr"),
    s = Math.floor((Date.now() - this.members[t][99]) / 1e3),
    t = Math.floor(s / 60),
    e = Math.floor(t / 60),
    this.tip.add("Joined group " + (s = (e ? e + "h, " : "") + (t ? t % 60 + "m, " : "") + s % 60 + "s") + " ago", "fcGray3"),
    Plr.gEB && this.tip.add(Plr.gEB + " Alchemists Online (+" + 2 * Plr.gEB + "% Experience)", "fcb"),
    this.tip.finish())
}
,
Group.prototype.setZone = function(t) {
    var e, s, a;
    switch (this.zone = t) {
    case 5:
        e = 14742015,
        s = 11782889,
        a = "#444444";
        break;
    case 6:
        e = 16772045,
        s = 11782889,
        a = "#444444";
        break;
    case 7:
        e = 2517550,
        s = 11782889,
        a = "#111111";
        break;
    case 8:
        e = 9866649,
        s = 11782889,
        a = "#222222";
        break;
    case 9:
        e = 8255999,
        s = 11782889,
        a = "#222222";
        break;
    case 10:
        e = 6118749,
        s = 11782889,
        a = "#000000";
        break;
    case 11:
        e = 6449207,
        s = 11782889,
        a = "#111111";
        break;
    case 12:
        e = 9333269,
        s = 11782889,
        a = "#222222";
        break;
    case 13:
        e = 15583663,
        s = 11782889,
        a = "#444444";
        break;
    case 14:
        e = 13136980,
        s = 11782889,
        a = "#222222";
        break;
    default:
        e = 4598820,
        s = 2105376,
        a = "#ccc"
    }
    this.zoneWallRGB = e,
    this.zoneWallCSS = getRGBShade(e, 0),
    this.zoneFloorHCSS = getRGBShade(e, -50),
    this.zoneSkyRGB = s,
    this.zoneSkyCSS = getRGBShade(s, 0),
    this.zoneSkyHCSS = getRGBShade(s, -50),
    this.miniMapColor = a,
    this.arrows && (t ? this.arrows.classList.add("inMap") : this.arrows.classList.remove("inMap"))
}
,
Group.prototype.isLeader = function(t) {
    return t = t || Plr.char,
    this.leaderId == t
}
,
Group.prototype.updateObjectives = function(t, e) {
    var s, a = "";
    switch (t) {
    case 0:
        for (this.objectives = e,
        s = 0; s < Group.objectives.length; s++)
            1 << s & e && (a += (a ? ", " : "") + Group.objectives[s]);
        a && Log.add("<font color='#FFF601'>Objective(s) Enabled: " + a + "</font>");
        break;
    case 1:
        for (this.objectives & e && (this.objectives -= e),
        s = 0; s < Group.objectives.length; s++)
            1 << s & e && (a = Group.objectives[s]);
        a && Log.add("<font color='#FFF601'>Objective Completed: " + a + "</font>")
    }
}
,
Group.prototype.updatePlayerStat = function(t, e, s) {
    switch (e) {
    case 22:
        s <= 0 && Log.add(this.members[t][13] + " has died.");
    case 20:
        this.setPlayerLife(t);
        break;
    case 23:
    case 21:
        this.setPlayerMana(t);
        break;
    case 6:
        Log.add(this.members[t][13] + " has gained a level."),
        this.members[t][3] = this.members[t][4],
        this.setPlayerLife(t),
        this.members[t][5] = this.members[t][6],
        this.setPlayerMana(t),
        this.members[t][15].setLevel(this.members[t][2]);
        break;
    case 48:
        this.setPlayerPos(t);
        break;
    case 41:
        this.setPlayerLoc(t);
        break;
    case 9:
        this.setPlayerExp(t);
        break;
    case 29:
        this.setEquip(t, 0, s);
        break;
    case 30:
        this.setEquip(t, 1, s);
        break;
    case 49:
        this.setSkilling(t, s);
        break;
    case 50:
        this.members[t][15].setDisc(s)
    }
}
,
Group.prototype.leave = function(t) {
    t == Plr.char ? (this.isLeader() && this.setLeader(0),
    Plr.destroyGroup()) : (Log.add(this.getFullName(t) + " has left the group."),
    this.delPlayer(t))
}
,
Group.prototype.join = function(t) {
    t = this.addPlayer(Gs.cw, t);
    Log.add(this.getFullName(t) + " has joined the group.")
}
,
Group.objectives = ["Explore the Maze", "A Pinch of Evil", "Bits and Pieces", "Face the Evil", "Hack the Horde", "Stop the Seven Shamans", "Treasure Pest", "Soften the Sneaky Shell", "Ambush!", "Slash the Swarm", "Four Corners", "Elemental Education", "No Maze No More", "The Mirror Maze"],
Group.getGuildName = function(t) {
    return "" != t ? " (" + replaceHTMLCodes(t) + ")" : ""
}
,
Item.prototype.setQuantity = function(t) {
    this.quantity.t.nodeValue = t || 1
}
,
Item.prototype.setEquipable = function() {
    Items.isUsable(this.item) || CE("DIV", this.o, "itemBoxRed")
}
,
Item.prototype.setCost = function(t) {
    this.cost || (this.cost = CE("div", this.o, "mktItemCost")),
    this.cost.innerHTML = t + '<img src="svg/iconGold.svg">'
}
,
Item.prototype.setCat = function(t) {
    this.cat = CE("div", this.o, "vltItemCat"),
    this.cat.innerHTML = t
}
,
Item.prototype.setGlyphDuration = function() {
    var t = this.item[3] - Math.floor(Date.now() / 1e3)
      , e = Math.floor(t / 60);
    this.quantity.t.nodeValue = e ? e + " m" : t + " s",
    t <= 0 && (this.glyph = clearInterval(this.glyph))
}
,
Item.prototype.rc = function() {
    this.o.parentNode && this.o.parentNode.removeChild(this.o)
}
,
Item.prototype.drawLootX = function() {
    this.lootX || (this.lootX = mSVG(this.o, {
        n: svgs.x,
        c: "iLoot"
    }),
    this.lootX.childNodes[0].setAttributeNS(null, "stroke", "#3E9461"),
    this.lootTxt && this.o.insertBefore(this.lootX, this.lootTxt))
}
,
Item.prototype.startLoot = function() {
    this.loot || (this.purge && (this.purge = clearTimeout(this.purge)),
    this.lootTxt = CE("div", this.o, "iTimer ds2"),
    this.lootTxt.innerHTML = "5 s",
    this.lootC = 5,
    this.loot = setInterval(this.lootTimer.bind(this), 1e3))
}
,
Item.prototype.clearLoot = function() {
    this.loot && (this.o.removeChild(this.lootTxt),
    this.lootTxt = null,
    this.loot = clearInterval(this.loot))
}
,
Item.prototype.lootTimer = function() {
    --this.lootC <= 0 ? this.clearLoot() : this.lootTxt.innerHTML = this.lootC + " s"
}
,
Item.prototype.startPurgeTimer = function(t) {
    this.purge || this.loot || (this.purgeCB = t,
    this.purge = setTimeout(function() {
        this.purgeCB(this.i)
    }
    .bind(this), 5e3))
}
,
Item.prototype.useItem = function(t) {
    if (3 == this.item[4]) {
        if (5 <= this.item[5] && this.item[5] <= 14 && Plr.g) {
            if (!Plr.g.isLeader())
                return void Log.add("Error: Only the group leader can use a map.");
            if (0 != Plr.c[41] || Plr.g.isAPlayerIn(1))
                return void Log.add("Error: All group members must be in town before you can use a map.")
        }
        Plr.target.set(),
        t = t || Plr.c[51],
        njs.sendData([1, 20, 1, 6, 8, this.i, 8, t.i])
    }
}
,
Item.prototype.down = function(t) {
    var e, s, a, i = t.ctrlKey;
    if (Plr.isM) {
        if (!this.tip)
            return;
        i = !0
    }
    if (Plr.isM && this.tip && (i = !0),
    this.out(t),
    this.isDrop)
        njs.sendData([1, 20, 1, 1, 8, this.i]),
        this.drawLootX();
    else if (i || t.metaKey)
        this.ctrlUse ? this.useItem(null) : this.ctrlCustom && njs.sendData([1, this.ccB1, 1, this.ccB2, 8, this.i]);
    else if (t.shiftKey && this.shiftClick) {
        if ((e = Vlt.get()) && e.item)
            return e.item.drop(this);
        if ((e = Mkt.get()) && e.item)
            return e.item.drop(this);
        if (e = Skill.get())
            for (s = 0; s < Skill.properties[e.type].items; s++)
                if (e.items[s] && !e.items[s].icon)
                    return e.items[s].drop(this)
    } else
        this.noDrag || Plr.isM || (i = Plr.itemW / 2,
        a = t.clientX - i,
        t = t.clientY - i,
        (dragO = new Item(stage,this.item,a,t,{
            noDrag: !0,
            noHover: !0
        })).o.style.opacity = .5,
        dragO.cbUp = this.up,
        dragO.oh = dragO.ow = i,
        dragO.po = this,
        dragO.o.className += " dragItem",
        Inv.sel(this))
}
,
Item.prototype.up = function(t, e) {
    for (; t; ) {
        if (t.drop) {
            t.drop(e);
            break
        }
        t = t.parentNode
    }
    dragO.del(),
    Inv.sel(0)
}
,
Item.prototype.delTip = function() {
    this.tip && (this.tip = this.tip.del())
}
,
Item.prototype.over = function(t) {
    var e;
    this.tip || (Plr.isM && evt.setSelItem(this),
    this.tip = new Tip(this.o,t,{
        c: "tbItemDesc"
    }),
    this.makeDesc(),
    this.compareEQ && !Plr.noItemComp && (t = [25, 26, 27])[e = this.item[4]] && Plr.c[t[e]] && Plr.items[Plr.c[t[e]]] && (t = Items.makeDesc(Plr.items[Plr.c[t[e]]], {
        noProfHelpText: 1,
        extCl: "itemBoxRight"
    }),
    this.tip.add(t),
    this.tip.finish()))
}
,
Item.prototype.out = function(t) {
    this.delTip(),
    Plr.isM && evt.unsetSelItem(this)
}
,
Item.prototype.del = function() {
    this.delTip(),
    this.glyph && (this.glyph = clearInterval(this.glyph)),
    this.clearLoot(),
    this.o.parentNode.removeChild(this.o),
    this.o = null
}
,
Item.prototype.makeDesc = function() {
    var t = Items.makeDesc(this.item, this);
    this.tip.add(t),
    this.tip.finish()
}
,
Item.prototype.sel = function() {
    this.o.classList.add("moItemSel")
}
,
Item.prototype.unsel = function() {
    this.o.classList.remove("moItemSel")
}
,
ItemSlot.prototype.dropEvt = function(t, e) {
    this.data.noDropSet || this.set(t.item),
    this.data.drop && (this.data.drop(this, t),
    evt.unsetSelItem(t))
}
,
ItemSlot.prototype.clear = function() {
    this.icon && this.icon.del(),
    this.icon = null
}
,
ItemSlot.prototype.click = function(t) {
    (Plr.isM && this.icon && this.icon.tip || t.ctrlKey || t.metaKey) && (this.clear(),
    Plr.isM) && evt.unsetSelItem()
}
,
ItemSlot.prototype.set = function(t) {
    this.clear(),
    this.icon = new Item(this.o,t,0,0,this.data.params)
}
,
ItemSlot.prototype.drop = function(t) {
    this.o.drop && this.o.drop(t)
}
;
var Items = {
    bonusStats: [["+", "%", "Enhanced Effect"], ["+", "", "Strength"], ["+", "", "Dexterity"], ["+", "", "Vitality"], ["+", "", "Intelligence"], ["+", "", "Max Life"], ["+", "", "Max Mana"], ["+", "%", "Experience Gained"], ["+", "", "Magic Luck"], ["+", "", "Life Regen"], ["+", "", "Mana Regen"], ["+", "", "Extra Equipment Slots"], ["+", "", "Critical Strike"], ["+1 to ", "", "Life per Attack"], ["+1 to ", "", "Mana per Attack"], ["+1 to ", "", "Life per Kill"], ["+1 to ", "", "Mana per Kill"], ["+", "%", "Life Steal"], ["+", "%", "Damage Return"], ["+", "%", "Mind Numb"], ["+", "%", "Armor Pierce"], ["+", "%", "Parry"], ["+", "%", "Critical Flux"], ["+", "%", "Physical Damage Reduction"], ["+", "%", "Magical Damage Reduction"], ["+", "%", "Mana Syphon"], ["+", "%", "Quick Draw"], ["-", "%", "Mana Consumption"], ["+", "%", "Heal Mastery"], ["+", "%", "Mana Skin"], ["+", "%", "Power Shot"], ["+", "%", "Glancing Blow"], ["+", "", "Jubilance"], ["+", "%", "Ice Mastery"], ["+", "%", "Fire Mastery"], ["+", "%", "Lightning Mastery"], ["+", "%", "Wind Mastery"], ["+", "%", "Earth Mastery"]],
    totemStats: [["+", "", "Guild Points"], ["+", "", "Stat Points"]],
    comfreyStats: [["+", "%", "Enhanced Effect"], [], [], [], [], ["Heals ", "", "Life"], ["Recovers ", "", "Mana"], [], [], [], [], [], [], [], [], ["", "%", "Cooked"], ["Quantity: ", "", ""]],
    fishingRodStats: [[], ["+", "", "to Proficiency"], [], [], [], ["+", "", "Durability"]],
    mapStats: [[], ["+", "", "Warm Lights"], ["+", "", "Evil Presences"], ["+", "", "Treasure Chests"], ["+", "", "Rooms"], [], [], ["+1% to ", "%", "Experience Gained"], [], ["+", "%", "Warm Light Effectiveness"], ["+", "%", "Monster Difficulty"], ["+1% to ", "%", "Item Drops"], ["+1% to ", "%", "Item Quality"], [], [], [], ["Quantity: ", "", ""], ["+", "%", "Swarm"], ["+", "%", "Guild Point"], ["+", "%", "Level Up"], ["+", "", "Level Cap"], ["+", "%", "Stealth"], ["+", "", "Evil Wells"]],
    potionStats: [[], ["+", "", "Strength"], ["+", "", "Dexterity"], ["+", "", "Vitality"], ["+", "", "Intelligence"], ["+", "", "Max Life"], ["+", "", "Max Mana"]],
    qStats: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], ["Quantity: ", "", ""]],
    itemData: [[["sword", 0, 1, 10, 1, 75], ["club", 1, 2, 9, 1, 90], ["axe", 0, 5, 6, 1, 50], ["dagger", 0, 4, 7, 1, 10], ["staff", 1, 3, 8, 1, 25], ["longsword", 0, 2, 20, 2, 75], ["warhammer", 1, 4, 18, 2, 90], ["battleaxe", 0, 10, 12, 2, 50], ["spear", 0, 8, 14, 2, 10], ["polearm", 0, 6, 16, 2, 25]], [["robe", 3, 0, 1], ["padded robe", 3, 0, 2], ["leather armor", 2, 1, 3], ["scale armor", 4, 1, 4], ["chain mail", 0, 2, 5], ["plate mail", 0, 2, 6]], [["ice", 5, 5, 6], ["fire", 5, 3, 8], ["lightning", 5, 1, 10], ["wind", 5, 2, 9], ["earth", 5, 4, 7], ["wild heal", 5, 1, 10, 1], ["heal", 5, 3, 8, 1], ["focused heal", 5, 5, 6, 1]], [["potion", 4, -1, -1], ["totem", 1, -1, -1], ["comfrey", -1, -1, -1], ["fish", 6, -1, -1], ["glyph", 5, -1, -1, 3], ["arctic map", 2, -1, -1], ["beach map", 2, -1, -1], ["forest map", 2, -1, -1], ["mountain map", 2, -1, -1], ["electriver map", 2, -1, -1], ["magteau map", 2, -1, -1], ["plains map", 2, -1, -1], ["valley map", 2, -1, -1], ["desert map", 2, -1, -1], ["volcano map", 2, -1, -1]], [["fishing rod", 1, -1, -1], ["essence", 5, -1, -1]]],
    cWeapons: ["Sword", "Club", "Axe", "Dagger", "Staff", "Longsword", "Warhammer", "Battleaxe", "Spear", "Polearm"],
    cArmors: ["Robe", "Paddedrobe", "Leather", "Scale", "Chainmail", "Platemail"],
    types: ["Weapons", "Armor", "Charms", "Items", "Objects"],
    icons: [["Sword", "Club", "Axe", "Dagger", "Staff", "Longsword", "Warhammer", "Battleaxe", "Spear", "Polearm"], ["Robe", "PaddedRobe", "Leather", "Scale", "Chainmail", "Platemail"], ["IceCharm", "FireCharm", "LightCharm", "WindCharm", "EarthCharm", "WildHealCharm", "HealCharm", "FocusedHealCharm"], ["Potion", "Totem", "Comfrey", "Fish", "Glyph", "Map", "Map", "Map", "Map", "Map", "Map", "Map", "Map", "Map", "Map"], ["Pole", "Essence"], ["Map", "Map", "Map", "Map", "Map", "Map", "Map", "Map", "Map", "Map"]],
    materials: [["rusted", "copper", "bronze", "iron", "steel", "alloy", "fine alloy", "mithril", "sapphire", "adamantium", "diamond", "tempered diamond", "tintitanium", "ultimanium"], ["splintered", "pine", "elm", "oak", "ironwood", "heartwood", "runewood", "stonewood", "ebonwood", "drywood", "darkwood", "steelwood", "angelwood", "godwood"], ["patched", "rawhide", "tanned", "cured", "hard", "double cured", "rigid", "embossed", "imbued", "runed", "enchanted", "tempered", "encrested", "fine honed"], ["tattered", "cotton", "woolen", "linen", "brocade", "silk", "gossamer", "elvan", "seamist", "nightshade", "wyvernskin", "silksteel", "pixiesilk", "spiderthread"], ["cracked", "steel leaf", "bone", "bine", "shell", "dragon bone", "fossil", "amber", "coral", "chitin", "fossilized", "crystallized", "petrified", "dragon skull"], ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV"], ["sardine", "herring", "cod", "trout", "bass", "salmon", "cat", "pike", "tuna", "mackerel", "grouper", "sturgeon", "sword", "marlin"]],
    magical: ["", "Magical", "Rare", "Mystical", "Angelic", "Mythical", "Arcane", "Legendary", "Godly", "Epic", "Relic", "Artifact", "Unique"],
    bonusStatSizes: [2, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    itemLegends: [0, 0, 0, "Use Item to Receive Effect", 0],
    add: function(t, e, s) {
        var a, i, o, r, l = s.getUint32(2, njs.LE), n = 6;
        for (t[l] = [l],
        1 == e || 2 == e ? (t[l].push(s.getUint32(n, njs.LE)),
        n += 4) : t[l].push(0),
        1 == e ? (t[l].push(s.getFloat64(n, njs.LE)),
        n += 8) : t[l].push(0),
        1 == e || 2 == e ? (t[l].push(s.getUint32(n, njs.LE)),
        n += 4) : 3 == e ? (t[l].push(s.getInt8(n)),
        n += 1) : t[l].push(0),
        t[l].push(s.getInt8(n++)),
        t[l].push(s.getInt8(n++)),
        t[l].push(s.getInt8(n++)),
        t[l].push(s.getInt8(n++)),
        t[l][8] = [],
        a = 0; a < Items.bonusStatSizes.length; a++)
            t[l][8][a] = 0;
        for (r = s.getInt8(n++),
        a = 0; a < r; a++) {
            switch (i = s.getInt8(n++),
            Items.bonusStatSizes[i]) {
            case 1:
                o = s.getUint8(n++);
                break;
            case 2:
                o = s.getInt16(n, njs.LE),
                n += 2;
                break;
            case 3:
                o = njs.getUint24(s, n),
                n += 3
            }
            t[l][8][i] = o
        }
        return l
    },
    getName: function(t) {
        var e = Items.itemData[t[4]][t[5]]
          , s = e[0]
          , a = -1 == e[1] ? 0 : Items.materials[e[1]][t[6]]
          , t = t[7] ? Items.magical[t[7]] + " " : "";
        return t += a ? (5 == e[1] ? "" : a + " ") + s + (5 == e[1] ? " " + a : "") : s
    },
    getIcon: function(t) {
        return Items.icons[t[4]][t[5]]
    },
    getLvlReq: function(t) {
        return 5 * t[6] - 10
    },
    isUsable: function(t) {
        if (Items.getLvlReq(t) > Plr.c[6])
            return !1;
        if (0 <= t[4] && t[4] <= 2) {
            var e = t[5]
              , t = t[4] + 2;
            if (!CStats.classData[Plr.c[5]][t][e])
                return !1
        }
        return !0
    },
    hasQuantity: function(t) {
        switch (t[4]) {
        case 3:
            return 2 == t[5] || 3 == t[5] || 5 <= t[5] && t[5] <= 14;
        case 4:
            return 1 == t[5]
        }
        return !1
    },
    getPerQuantityValue: function(t, e) {
        return t[8][16] < 2 ? t[8][e] : Math.floor(t[8][e] / t[8][16])
    },
    getDuration: function(t) {
        return 5 * (t[6] + 1) * (100 + t[8][0]) / 100
    },
    getEffectLabel: function(t) {
        var e = Items.getEffectRange(t);
        switch (t[4]) {
        case 0:
            return ["Damage: " + e[0] + " to " + e[1]];
        case 1:
            return ["Physical Defense: " + e[0] + " to " + e[1], "Magical Defense: " + e[2] + " to " + e[3]];
        case 2:
            return [(Items.itemData[t[4]][t[5]][4] ? "Heals" : "Spell Damage") + ": " + e[0] + " to " + e[1]]
        }
        return []
    },
    getCalcStat: function(t, e, s, a) {
        return t = (t *= e + 1) * (100 + s - 5) / 100,
        a && (t = t * (100 + (a = (s = 20 * (e + 2)) < a ? s : a)) / 100),
        Math.floor(t)
    },
    getEffectRange: function(t) {
        if (2 < t[4])
            return [0, 0];
        var e = Items.itemData[t[4]][t[5]]
          , s = t[8][0];
        switch (t[4]) {
        case 0:
            var a = Math.floor(Plr.c[16] * e[5] / 100) + Math.floor(Plr.c[17] * (100 - e[5]) / 100)
              , a = Math.floor(125 * a / 100);
            return s += Plr.c[52][t[5]] ? Plr.c[52][t[5]][0] : 0,
            [Items.getCalcStat(e[2], t[6], a, s), Items.getCalcStat(e[3], t[6], a, s)];
        case 1:
            return [Items.getCalcStat(e[2], t[6], Plr.c[18], s), Items.getCalcStat(e[3], t[6], Plr.c[18], s), Items.getCalcStat(2 - e[2], t[6], Plr.c[19], s), Items.getCalcStat(7 - e[3], t[6], Plr.c[19], s)];
        case 2:
            return s = (s += Plr.c[53][t[5]] ? Plr.c[53][t[5]][0] : 0) + (Items.itemData[t[4]][t[5]][4] ? Plr.c[56][28] : Plr.c[56][33 + t[5]]),
            [Items.getCalcStat(e[2], t[6], Plr.c[19], s), Items.getCalcStat(e[3], t[6], Plr.c[19], s)]
        }
    },
    isEquipped: function(t) {
        return t == Plr.c[25] || t == Plr.c[26] || t == Plr.c[27] || t == Plr.c[28]
    },
    canStack: function(t, e) {
        return e ? t != e && Items.canStack(t) && Items.canStack(e) && e[4] == t[4] && e[5] == t[5] && e[6] == t[6] : (3 == t[4] && (2 == t[5] || 3 == t[5]) || 4 == t[4] && 1 == t[5]) && t[7]
    },
    stackItem: function(t, e) {
        njs.sendData([1, 20, 1, 7, 8, t, 8, e])
    },
    isConsumable: function(t) {
        return 3 == t[4]
    },
    isHealCharm: function(t) {
        return 2 == t[4] && Items.itemData[t[4]][t[5]][4]
    },
    getFishPercent: function(t) {
        var e = 25 * (t[6] + 1)
          , s = 100 * (t[6] + 1)
          , a = 0;
        return t[8][5] && (a = (t[8][5] - e) / (s - e) * 100),
        t[8][6] && (t = (t[8][6] - e) / (s - e) * 100,
        a = a ? (a + t) / 2 : t),
        a
    },
    getStatTbl: function(t) {
        return Items.itemStatsTable[t[4]] && Items.itemStatsTable[t[4]][t[5]] ? Items.itemStatsTable[t[4]][t[5]] : Items.bonusStats
    },
    getShortDesc: function(t) {
        for (var e = "", e = Items.getName(t), s = Items.getEffectLabel(t), a = 0; a < s.length; a++)
            e += ", " + s[a];
        var i = Items.getStatTbl(t);
        if (t[7])
            for (a in i)
                t[8][a] && (e += ", " + i[a][0] + t[8][a] + i[a][1] + " " + i[a][2]);
        return e
    },
    makeDesc: function(t, e) {
        e = e || {};
        var s, a, i, o, r = Items.isEquipped(t[0]), l = CE("div", null, "itemDescBox" + (r ? " iEquipped" : "") + (e.extCl ? " " + e.extCl : "")), n = 0, c = 0, d = 0;
        for (l.bgIcon = cS(l, {
            s: "svg/icon" + Items.getIcon(t) + ".svg",
            w: 40,
            h: 40,
            c: "itemDescImg"
        }),
        CTD(l, Items.getName(t), (Items.isUsable(t) ? "fcb" : "fcr") + " fwb"),
        Items.itemLegends[t[4]] && CTD(l, Items.itemLegends[t[4]], "fcGray"),
        4 != t[4] ? 0 < (a = Items.getLvlReq(t)) && CTD(l, "Level Req: " + a, a > Plr.c[6] ? "fcr" : "fcb") : 0 < (a = 5 * t[6]) && CTD(l, "Skill Rank Req: " + a, "fcb"),
        i = Items.getEffectLabel(t),
        s = 0; s < i.length; s++)
            CTD(l, i[s], "fcb");
        switch (Items.itemData[t[4]][t[5]][4]) {
        case 2:
            CTD(l, "Heavy Weapon", "fcGray");
            break;
        case 3:
            Plr.glyphs[t[0]] ? d = t[3] : CTD(l, "Effect Duration: " + Items.getDuration(t) + " minutes", "fcb")
        }
        if (2 == t[4] && CTD(l, "Mana Cost: " + (8 * t[6] + 5), "fcb"),
        o = Items.getStatTbl(t),
        e.hasQuantity && (n = t[8][5],
        c = t[8][6],
        t[8][5] = Items.getPerQuantityValue(t, 5),
        t[8][6] = Items.getPerQuantityValue(t, 6)),
        t[7])
            for (s in o)
                t[8][s] && CTD(l, o[s][0] + t[8][s] + o[s][1] + " " + o[s][2], "fcb");
        if (e.hasQuantity && (t[8][5] = n,
        t[8][6] = c),
        (e.ctrlUse || e.ctrlCustom) && CTD(l, "Ctrl-Click to " + (e.ctrlUse ? "Use" : {
            eqp: "Equip",
            vaw: "Withdraw"
        }[e.ctrlCustom]) + " this item", "fcBlue1"),
        !e.noProfHelpText && r)
            for (s = 0; s < 3; s++)
                Plr.cd.ab[s] && (0 == Abilities.data[Plr.cd.ab[s]][2] && 0 == t[4] || 1 == Abilities.data[Plr.cd.ab[s]][2] && 2 == t[4]) && CTD(l, Settings.getKB(Plr.keycodes[35 + s], Plr.keymap[35 + s]) + "-Click target to use " + Abilities.data[Plr.cd.ab[s]][0] + " ability", "fcBlue1");
        return (d = !d && t[3] && Mkt.I && Mkt.I[t[0]] ? 604800 + t[3] : d) && ("Soon" != (i = te(d)) || t[2] ? CTD(l, "Ends In: " + te(d), "iEndsIn") : CTD(l, "Expired", "iEnded")),
        t[2] && (CE("div", l, "iCost").innerHTML = "Cost: " + t[2] + '<img src="svg/iconGold.svg">'),
        l
    }
};
function Meter(t, e, s, a, i, o, r, l) {
    this.o = CE("DIV", t, "meterBox" + (l ? " " + l : "")),
    this.o.style.overflow = "hidden",
    this.w = a,
    this.prog = CE("DIV", this.o, "pa meterBoxProg", {
        left: 0,
        top: 0,
        width: "1px",
        height: i + "px"
    }),
    this.noText = !1,
    "" == r && (i < 10 ? this.noText = !0 : this.isPerc = !0),
    this.noText || (this.label = CTD(this.o, r, "meterBoxLabel")),
    this.set(o)
}
function Mob(t, e) {
    this.o = CE("DIV", t, "mob"),
    this.i = e[0],
    this.imageId = e[1],
    this.mName = e[5] || MobNames[this.imageId],
    this.life = e[4] || 100,
    e[2] && (this.s = Math.floor(e[2] / 10 * 100)),
    this.o.style.width = this.o.style.height = this.s + "px",
    this.w = this.s;
    this.lifeBar = new Meter(this.o,0,0,this.w,12,this.life / 100,this.mName,"lifeMeter"),
    this.image = cS(this.o, {
        s: "svg/mob" + this.imageId + ".svg",
        w: this.s,
        h: this.s
    }),
    this.pos = -1,
    this.setPos(e[3]),
    aE(this.o, evt.MD, this.down.bind(this)),
    Plr.noAHA && (aE(this.o, evt.MU, this.up.bind(this)),
    aE(this.o, "mouseout", this.up.bind(this)))
}
Items.itemStatsTable = [[], [], [], [Items.potionStats, Items.totemStats, Items.comfreyStats, Items.comfreyStats, 0, Items.mapStats, Items.mapStats, Items.mapStats, Items.mapStats, Items.mapStats, Items.mapStats, Items.mapStats, Items.mapStats, Items.mapStats, Items.mapStats], [Items.fishingRodStats, Items.qStats]],
Meter.prototype.set = function(t, e) {
    this.perc = t,
    this.prog.style.width = 100 * t + "%",
    this.noText || (e = this.isPerc ? Math.floor(100 * t) + " %" : e) && (this.label.t.nodeValue = e)
}
,
Mob.prototype.getName = function() {
    return this.mName + (this.guild ? " (" + this.guild + ")" : "")
}
,
Mob.prototype.setSize = function(t) {
    t = Math.floor(t / 10 * 100),
    this.o.style.width = this.o.style.height = t + "px",
    this.stopTimer()
}
,
Mob.prototype.setPos = function(t) {
    this.o.classList.add("mobPos" + t),
    -1 != this.pos ? (this.o.classList.remove("mobPos" + this.pos),
    this.timeXY()) : this.setXY(),
    this.pos = t,
    this.stopTimer()
}
,
Mob.prototype.timeXY = function() {
    var t = this;
    t.getXY = setTimeout(function() {
        t.setXY(),
        t.getXY = 0
    }, 1e3)
}
,
Mob.prototype.setXY = function() {
    this.x = getRelPos(this.o, "offsetLeft"),
    this.y = getRelPos(this.o, "offsetTop")
}
,
Mob.prototype.addDmg = function(t, e, s, a, i) {
    this.getXY && this.setXY(),
    dTDmg(t, this.x + rnd(0, this.w - 20), this.y + rnd(20, this.s - 20), e, s, a, i)
}
,
Mob.prototype.del = function() {
    this.stopTimer(),
    this.getXY && (this.getXY = clearTimeout(this.getXY)),
    this.o.parentNode.removeChild(this.o),
    this.image = this.lifeBar = this.o = null
}
,
Mob.prototype.down = function(t) {
    if (Plr.inCombat && Plr.target.set(t, this.i, Cbt.clickAttack),
    Plr.isM)
        return eSP(t)
}
,
Mob.prototype.stopTimer = function() {
    Plr.target.id == this.i && Plr.target.set()
}
,
Mob.prototype.up = function(t) {
    this.stopTimer()
}
,
Mob.prototype.setLife = function(t) {
    this.life = t,
    this.lifeBar.set(t / 100)
}
,
Mob.prototype.addOrb = function(t) {
    var e = CE("div", this.o, "mobOrb " + t)
      , t = "blue" == t ? '<img src="svg/iconFireCharm.svg"><img src="svg/iconIceCharm.svg"><img src="svg/iconLightCharm.svg"><img src="svg/iconWindCharm.svg"><img src="svg/iconEarthCharm.svg">' : '<img src="svg/iconSword.svg"><img src="svg/iconClub.svg"><img src="svg/iconAxe.svg"><img src="svg/iconDagger.svg"><img src="svg/iconStaff.svg">';
    e.innerHTML = '<div class="C"></div><div class="I">' + t + "</div></div>",
    aE(e, "animationend", function(t) {
        TRC(this)
    })
}
,
Mob.prototype.addMastery = function(t) {
    t = cS(this.o, {
        s: "svg/icon" + t + "Charm.svg",
        c: "mobMast"
    });
    t.alp = new njTween(t,"opacity",.8,0,2,TRC)
}
,
Mob.prototype.addDrip = function() {
    aE(CE("div", this.o, "lifeStealBuff"), "animationend", function(t) {
        TRC(this)
    })
}
,
Mob.prototype.doParalyze = function() {}
,
Mob.prototype.passiveStat = function(t) {
    switch (t) {
    case 23:
        this.addOrb("red");
        break;
    case 24:
        this.addOrb("blue");
        break;
    case 28:
        this.addMastery("Heal");
        break;
    case 34:
        this.addMastery("Fire");
        break;
    case 33:
        this.addMastery("Ice");
        break;
    case 35:
        this.addMastery("Light");
        break;
    case 36:
        this.addMastery("Wind");
        break;
    case 37:
        this.addMastery("Earth");
        break;
    case 17:
        this.addDrip()
    }
}
,
Mob.statMap = {
    22: 4,
    29: 7,
    30: 8,
    39: 3,
    24: 2
};
var MobNames = ["huntaguar", "cinderfella", "barkodile", "tonguerus", "azapnid", "mantrap", "porcuball", "electrowisp", "chargon", "aqueous", "peaktrice", "slamander", "mygmops", "dunebug", "blistorb", "electromagon", "hieramosickles", "huntracter", "bloodrat", "brrraptor", "shonark", "frisp", "doomglider", "fremlin", "demonog", "goocidic", "darknice", "incapacitor", "gustfly", "currenahna", "albadross", "clifftanger", "frostivil", "rawrgoyle", "twintile", "slugger", "charcoaleton", "gigapede", "mantaprey", "razorpus", "wind-o-shade", "stormtalon", "boaurora", "windragon", "elephoerectus", "glazier", "taga", "moltengrabba", "rocktopus", "hotchet", "wrizard", "sunwisp", "subsorber", "walktopus", "searpent", "kangarel", "scavengfur", "freaver", "clawgel", "frigadoon", "foglime", "magneticrawler", "prowlion", "torrentile", "magaton", "lavoulder", "tornalisk", "pawfulgore", "bloodbunny", "barrenray", "electangle", "scorparcher", "reduca", "sharfin", "sinseerical", "needleback", "shocktooth", "razortail", "sparkelfish", "posiaclawn", "repelican", "hornicorn", "camouslauge", "uniscorchus", "voltseeker", "glyger", "sproutiger", "floraworm", "seevil", "slugslider", "debrivil", "wyrmbat", "treeslug", "gargrrryl", "fizzypup", "misticle", "trunkiller", "gigabee", "ballrus", "reptigon"]
  , pops = {
    cur: 0,
    x: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    y: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    w: [],
    h: [],
    o: [],
    cls: ["Stats", "Profs", "Inv", "Drops", "Market", "Shrine", "Groups", "Ladder", "Vault", "Skillup", "Settings", "Chat"]
};
function Popup(t, e, s, a) {
    this.o = CE("DIV", stage, "popupBox pb" + pops.cls[t] + (Plr.tPB ? " tPB" : "")),
    -(this.isPopBox = 1) != e ? (this.o.style.width = e + "px",
    this.o.style.height = s + "px") : (e = this.o.offsetWidth,
    s = this.o.offsetHeight),
    -1 != pops.x[t] && (this.o.style.left = pops.x[t] + "px",
    this.o.style.top = pops.y[t] + "px"),
    this.cbClose = 0,
    this.idx = t,
    this.w = e,
    this.h = s,
    this.x = pops.x[t],
    this.y = pops.y[t],
    this.drag = mSVG(this.o, {
        n: svgs.triangle,
        s: 10,
        c: "cp pbDrag"
    }),
    aE(this.drag, Plr.isM ? "touchstart" : evt.MD, this.dragEvt.bind(this)),
    this.close = mSVG(this.o, {
        n: svgs.x,
        c: "cp pbClose",
        cb: this.closeE.bind(this)
    }),
    a && (this.pTitle = CE("div", this.o, "popupTitle"),
    this.pTitle.innerHTML = a),
    aE((pops.o[t] = this).o, evt.MC, this.click.bind(this)),
    this.bringToFront()
}
function Prf(t, e, s, a, i) {
    this.o = CE("DIV", t, "profStat");
    t = 3 != a ? "icon" + Items.icons[a][e] : "icon" + Prof.skillIcons[e];
    this.icon = cS(this.o, {
        s: "svg/" + t + ".svg",
        w: 18,
        h: 18
    }),
    this.i = e,
    this.pType = a,
    this.psType = i,
    this.level = CTD(this.o, "", "profLevel"),
    this.bar = new Meter(this.o,-4,20,26,4,0,"","profMeter"),
    this.setProgress(),
    aE(this.o, "mouseover", this.over.bind(this)),
    aE(this.o, "mouseout", this.out.bind(this))
}
Popup.prototype.dragEvt = function(t) {
    dragO || (this.bringToFront(),
    this.o.style.opacity = .5,
    this.prop = "o",
    (dragO = this).ow = (Plr.isM ? t.changedTouches[0].pageX : t.clientX) - this.o.offsetLeft,
    dragO.oh = (Plr.isM ? t.changedTouches[0].pageY : t.clientY) - this.o.offsetTop,
    dragO.cbUp = function(t, e) {
        e.x = parseInt(e.o.style.left),
        e.y = parseInt(e.o.style.top),
        e.o.style.opacity = 1
    }
    )
}
,
Popup.prototype.bringToFront = function() {
    if (this.o) {
        if (pops.cur) {
            if (pops.cur.idx == this.idx)
                return;
            pops.cur.o.classList.remove("cur")
        }
        this.o.classList.add("cur"),
        pops.cur = this
    }
}
,
Popup.prototype.click = function(t) {
    this.bringToFront()
}
,
Popup.prototype.closeE = function(t) {
    t.stopPropagation(),
    this.del()
}
,
Popup.prototype.del = function() {
    this.cbClose && this.cbClose(this),
    pops.cur == this && (pops.cur = 0),
    pops.o[this.idx] = 0,
    pops.x[this.idx] = this.x,
    pops.y[this.idx] = this.y,
    this.resize && (pops.w[this.idx] = this.w,
    pops.h[this.idx] = this.h),
    localStorage.pops = JSON.stringify({
        x: pops.x,
        y: pops.y,
        w: pops.w,
        h: pops.h,
        ih: window.innerHeight,
        iw: window.innerWidth
    }),
    this.o.parentNode.removeChild(this.o),
    Plr.isM && evt.unsetSelItem(),
    this.resize = this.close = this.pTitle = this.drag = this.o = null
}
,
Popup.prototype.drawResize = function(t) {
    this.resize = CE("div", this.o, "pbResize"),
    this.resize.x = this.w - 8 - 2,
    this.resize.y = this.h - 8 - 2,
    this.resize.s = 8,
    this.resize.b = 2,
    aE(this.resize, Plr.isM ? "touchstart" : evt.MD, this.clickResize.bind(this)),
    this.resizeCB = t
}
,
Popup.prototype.clickResize = function(t) {
    var e;
    dragO || (e = this.resize,
    this.bringToFront(),
    this.prop = "resize",
    (dragO = this).ow = (Plr.isM ? t.changedTouches[0].pageX : t.clientX) - e.offsetLeft,
    dragO.oh = (Plr.isM ? t.changedTouches[0].pageY : t.clientY) - e.offsetTop,
    dragO.cbUp = this.resizeEvt,
    dragO.cbMove = dragO.cbUp)
}
,
Popup.prototype.resizeEvt = function(t, e) {
    var s = this.o
      , a = this.resize
      , i = getRelPos(a, "offsetLeft") - getRelPos(s, "offsetLeft") + a.s + a.b
      , o = getRelPos(a, "offsetTop") - getRelPos(s, "offsetTop") + a.s + a.b;
    o < 65 && (o = 65),
    s.style.width = (i = i < 108 ? 108 : i) + "px",
    s.style.height = o + "px",
    this.w = i,
    this.h = o,
    a.style.left = a.style.top = "auto",
    this.resizeCB && this.resizeCB(this)
}
,
Popup.closeAll = function() {
    for (var t = 0; t < pops.o.length; t++)
        pops.o[t] && pops.o[t].del()
}
,
Prf.prototype.setProgress = function() {
    var t = Plr.c[this.psType][this.i] && Plr.c[this.psType][this.i][0] ? Plr.c[this.psType][this.i][0] : 0
      , e = Plr.c[this.psType][this.i] && Plr.c[this.psType][this.i][1] ? Plr.c[this.psType][this.i][1] : 0;
    this.level.t.nodeValue = t,
    this.bar.set(e / (1e3 * (t + 1)))
}
,
Prf.prototype.over = function(t) {
    var e, s;
    this.tip || (this.tip = new Tip(this.o,t),
    t = Plr.c[this.psType][this.i] && Plr.c[this.psType][this.i][0] ? Plr.c[this.psType][this.i][0] : 0,
    e = Plr.c[this.psType][this.i] && Plr.c[this.psType][this.i][1] ? Plr.c[this.psType][this.i][1] : 0,
    s = Prof.getName(this.pType, this.i),
    this.tip.add(up1stChar(s) + " Proficiency", "fcb fwb"),
    this.tip.add("Rank: " + t, "fcb"),
    this.tip.add("Progress: " + e + " / " + 1e3 * (t + 1) + " (" + Math.floor(e / (1e3 * (t + 1)) * 100 * 100) / 100 + " %)", "fcb"),
    0 < t && 3 != this.pType && this.tip.add("Bonus: +" + t + "% Enhanced Effect", "fcb"),
    this.tip.finish())
}
,
Prf.prototype.closeTip = function() {
    this.tip && (this.tip = this.tip.del())
}
,
Prf.prototype.out = function(t) {
    this.closeTip()
}
;
var Prof = {
    skillIcons: ["Fish", "Cook", "Glyph", "Chest", "Essence"],
    skillNames: ["Fishing", "Cooking", "Glyphing", "Transmuting", "Suffusencing"],
    getName: function(t, e) {
        return 3 != t ? Items.itemData[t][e][0] : Prof.skillNames[e]
    },
    get: function() {
        return pops.o[1]
    },
    tog: function() {
        var t, e, s = Prof.get();
        if (s)
            return s.del();
        for ((s = new Popup(1,-1,-1,"Proficiencies")).p = new Array(4),
        t = 0; t < 4; t++)
            s.p[t] = [];
        for (e = CE("div", s.o),
        t = 0; t < Items.icons[0].length; t++)
            s.p[0][t] = new Prf(e,t,20,0,52);
        for (e = CE("div", s.o),
        t = 0; t < Items.icons[2].length; t++)
            s.p[2][t] = new Prf(e,t,50,2,53);
        for (e = CE("div", s.o),
        t = 0; t < Prof.skillNames.length; t++)
            s.p[3][t] = new Prf(e,t,80,3,54)
    },
    addPoints: function(t, e, s) {
        var a, i = Prof.getData(t), i = (s = s || 1,
        Plr.c[i][e] ? Plr.c[i][e][1] += s : Plr.c[i][e] = [0, s],
        Plr.c[i][e][1] >= 1e3 * (Plr.c[i][e][0] + 1) && (++Plr.c[i][e][0],
        Plr.c[i][e][1] = 0,
        Log.add("You have gained a rank in " + Prof.getName(t, e) + " proficiency. (Rank: " + Plr.c[i][e][0] + ")"),
        Sound.play(6)),
        Prof.get());
        i && (i.p[t][e].setProgress(),
        a = i.p[t][e].o.offsetLeft,
        t = i.p[t][e].o.offsetTop,
        createDmgText(i.o, a, t, "+" + s, "profDmg", 1))
    },
    getData: function(t) {
        switch (t) {
        case 0:
            return 52;
        case 2:
            return 53;
        case 3:
            return 54
        }
    },
    processPenalty: function(t, e) {
        var s, a;
        for (s in t)
            0 < t[s][1] && (a = Math.floor(t[s][1] / e),
            t[s][1] -= a)
    },
    doDeathPenalty: function() {
        var t = 10 - Plr.c[14]
          , t = (Prof.processPenalty(Plr.c[52], t = t < 1 ? 1 : t),
        Prof.processPenalty(Plr.c[53], t),
        Prof.get());
        t && (t.del(),
        Prof.tog())
    }
}
  , Skill = {
    properties: [{
        cmd: "fsh",
        cLen: 7,
        items: 1,
        reqItems: 0,
        levelBox: !0,
        start: "Fish",
        head: "Drop a fishing rod onto the box below to use it, or leave it blank to use a free loaner fishing rod.",
        bars: ["Fishing Rod", "? ? ?"],
        labels: ["Keep your rod's bar up or it will break.", "Click Reel to reel in your catch."],
        buttons: ["Reel", "Snag Counter"],
        allowTimer: 1,
        rememberItem: 1,
        counters: ["Snag!"],
        stop: "Release Line",
        again: "Fish More"
    }, {
        cmd: "cok",
        cLen: 6,
        items: 1,
        reqItems: 1,
        start: "Cook",
        head: "Drop an item you wish to cook onto the box below.",
        setItemName: !0,
        bars: ["Temperature", "bottom"],
        labels: ["If the temperature gets too hot, your item will burn.", "Click Cook to season and cook your item."],
        minQ: 5,
        minM: 0,
        minR: -3,
        buttons: ["Cook", "Flame Counter"],
        allowTimer: 1,
        rememberStackItem: 1,
        counters: ["Flame!"],
        stop: "Stop Cooking",
        again: "Cook More"
    }, {
        cmd: "gly",
        cLen: 10,
        items: 2,
        reqItems: 1,
        start: "Glyph",
        head: "Drop an item or two glyphs you wish to glyph onto the box(es) below.",
        bars: ["Magic Stability", "Glyph Progress"],
        labels: ["Maintain the magic stability!", "Click the appropriate techniques below."],
        minQ: 5,
        minM: 3,
        buttons: ["Inscribe", "Transfuse", "Purge"],
        counters: ["Inscribe!", "Transfuse!", "Purge!", "", "", "", "", "", "! ??? !"],
        stop: "Abort",
        again: "Glyph More"
    }, {
        cmd: "trm",
        cLen: 10,
        items: 2,
        reqItems: 1,
        start: "Transmute",
        head: "Drop an item or item + essence you wish to transmute onto the box(es) below.",
        bars: ["Volatility", "Transmutation"],
        labels: ["Click Stabilize to lower the Volatility.", "Click Transmute to transmute your item."],
        minQ: 5,
        minM: 2,
        buttons: ["Transmute", "Stabilize"],
        stop: "Abort",
        again: "Transmute More",
        allowTimer: 1,
        rememberStackItem: 1
    }, {
        cmd: "suf",
        cLen: 10,
        items: 2,
        reqItems: 1,
        start: "Suffusence",
        head: "Drop an item + essence you wish to suffusence onto the boxes below.",
        bars: ["Permanence", "Suffusencion"],
        labels: ["Don't let the Permanance run out.", "Click the correct technique as necessary."],
        minQ: 5,
        minM: 2,
        buttons: ["Suffuse", "Extract"],
        rememberStackItem: 1,
        counters: ["Suffuse!", "Extract!"],
        stop: "Abort",
        again: "Suffusence More"
    }],
    get: function() {
        return pops.o[9]
    },
    w: 300,
    tog: function(t) {
        Skill.close();
        var e = new Popup(9,-1,-1,Prof.skillNames[t]);
        e.type = t,
        e.items = new Array(2),
        e.usedItems = new Array(2),
        e.cmdParams = new Array(2),
        e.bars = new Array(2),
        e.spc = CE("div", e.o, "skillBody"),
        e.cbClose = Skill.cbClose,
        Skill.drawStart(e)
    },
    cbClose: function(t) {
        Skill.run(null),
        Skill.stopSkill(!1)
    },
    close: function() {
        var t = Skill.get();
        t && t.del()
    },
    clearPop: function(t) {
        dAC(t.spc)
    },
    drawStart: function(t) {
        var e, s, a, i;
        for (Skill.clearPop(t),
        t.itemId = 0,
        CTD(t.spc, Skill.properties[t.type].head, "fs11 fcw"),
        e = 0; e < Skill.properties[t.type].items; e++) {
            t.items[e] = new ItemSlot(t.spc,{
                ctrlClear: !0,
                params: {
                    noDrag: !0
                }
            });
            var o = 0;
            t.usedItems[e] ? o = t.usedItems[e] : Skill.properties[t.type].rememberItem && Plr.skillItemRem && (o = Plr.skillItemRem),
            o && Plr.items[o] && t.items[e].set(Plr.items[o])
        }
        Skill.properties[t.type].levelBox && (a = (Plr.c[54][t.type] && Plr.c[54][t.type][0] ? Plr.c[54][t.type][0] : 0) + 1,
        CTD(s = CE("div", t.spc, "skLabWrap"), "Level:", "skLvlLabel", "label"),
        t.level = CFI(s, {
            c: "skLvlTxt",
            ml: 2,
            v: a
        })),
        Skill.properties[t.type].minQ && (s = 0,
        Plr.c[54] && Plr.c[54][t.type] && (s = Plr.c[54][t.type][0]),
        Skill.properties[t.type].minR && (s += Skill.properties[t.type].minR),
        a = Math.floor(s / Skill.properties[t.type].minQ),
        i = 0,
        Skill.properties[t.type].minM ? (i = Math.floor((s - a * Skill.properties[t.type].minQ) * Skill.properties[t.type].minM)) < 1 && (i = 1) : a * Skill.properties[t.type].minQ < s && a++,
        CTD(t.spc, "Minimum To Skill Up: Tier " + Items.materials[5][a] + (i ? ", " + Items.magical[i] : ""), "fs11 fcw")),
        CAB({
            p: t.spc,
            c: "abutGradBl skBut",
            v: Skill.properties[t.type].start,
            oc: Skill.clickStart
        })
    },
    sendStartCmd: function(t) {
        var e, s = 0, a = [1, 50, 1, t.type];
        for (Skill.properties[t.type].levelBox && (a.push(1),
        a.push(t.cmdParams[s++])),
        e = 0; e < Skill.properties[t.type].items; e++)
            a.push(8),
            a.push(t.cmdParams[s++]);
        njs.sendData(a)
    },
    clickStart: function(t) {
        for (var e, s = Skill.get(), a = 0, i = 0, o = 0, r = (Skill.properties[s.type].levelBox && (e = parseInt(s.level.value),
        s.cmdParams[o++] = e = e < 0 || 99 < e ? 1 : e),
        s.usedItems = new Array(2),
        s.itemId = 0), l = 0; l < Skill.properties[s.type].items; l++)
            s.items[l].icon ? (a++,
            s.cmdParams[o++] = s.items[l].icon.i,
            0 == s.type && 0 == l && (s.itemId = s.items[l].icon.i),
            Skill.properties[s.type].rememberItem ? Plr.skillItemRem = s.items[l].icon.i : Skill.properties[s.type].rememberStackItem && Items.hasQuantity(s.items[l].icon.item) && 1 < s.items[l].icon.item[8][16] && (s.usedItems[i++] = s.items[l].icon.i)) : r++;
        for (l = 0; l < r; l++)
            s.cmdParams[o++] = 0;
        a < Skill.properties[s.type].reqItems || (Skill.properties[s.type].setItemName && (s.itemName = Items.getName(s.items[0].icon.item)),
        Skill.sendStartCmd(s))
    },
    startSkill: function(t, e, s) {
        var a, i = Skill.get();
        for (Skill.clearPop(i),
        i.started = !0,
        Plr.stopHealTimer(),
        a = CE("div", i.spc, ""),
        n = 0; n < 2; n++)
            CTD(a, Skill.properties[i.type].labels[n], "fs11 fcw"),
            i.bars[n] = new Meter(a,(i.w - 200) / 2,40 + 40 * n,200,12,(0 == n ? e : s) / 100,Skill.properties[i.type].bars[n],"skillMeter");
        Skill.properties[i.type].setItemName && (i.bars[1].label.t.nodeValue = i.itemName);
        for (var o = [], r = [], l = Skill.properties[i.type].buttons.length, n = 0; n < l; n++)
            r[n] = n;
        for (n = l - 1; 0 <= n; n--) {
            var c = rnd(0, n);
            o[n] = r[c],
            r[c] = r[n]
        }
        for (i.buttons = new Array(l + 1),
        a = CE("div", i.spc, ""),
        n = 0; n < l; n++)
            i.buttons[n] = CAB({
                p: a,
                c: "abutGradBl skBut",
                v: Skill.properties[i.type].buttons[o[n]],
                oc: function(t) {
                    njs.sendBytes(51, this.i)
                }
            }),
            i.buttons[n].i = o[n],
            Skill.properties[i.type].allowTimer && (aE(i.buttons[n], evt.MD, Skill.down),
            aE(i.buttons[n], evt.MU, Skill.up),
            aE(i.buttons[n], "mouseout", Skill.up));
        i.buttons[l] = CAB({
            p: i.spc,
            c: "abutGradBl skBut",
            v: Skill.properties[i.type].stop,
            oc: Skill.run
        }),
        Plr.hideAbort && "Abort" == i.buttons[l].innerText && (i.buttons[l].style.display = "none")
    },
    R: function(t) {
        var e = Skill.get().bars[1].o;
        createDmgText(Skill.get().o, e.offsetLeft + 210, e.offsetTop, t, "skillClickNotify", .5)
    },
    down: function(t) {
        Plr.target.set(t, this.i, function(t) {
            njs.sendBytes(51, t),
            Skill.R(".")
        })
    },
    up: function(t) {
        Plr.target.set()
    },
    stopTimer: function() {
        Plr.target.set()
    },
    run: function(t) {
        Skill.get().started && njs.sendBytes(51, 3)
    },
    stopSkill: function(t, e, s, a) {
        var i = Skill.get();
        if (i.started) {
            i.started = !1,
            Gs.door || Plr.startHealTimer();
            for (var o = 0; o < i.buttons.length; o++)
                i.buttons[o].parentNode.removeChild(i.buttons[o]);
            Skill.stopTimer(),
            t && 0 == i.type && (i.bars[1].label.t.nodeValue = "- Escaped the Hook -"),
            (s || a || e) && (t = CE("div", i.spc, "skDone"),
            s && CT("+" + s + " " + Prof.skillNames[i.type] + " Proficiency", CE("div", t)),
            a && CT("+" + a + " Experience", CE("div", t)),
            e) && (s = Plr.items[e]) && CT(Items.getShortDesc(s), CE("div", t)),
            0 == i.type && "0px" != i.bars[0].prog.width ? CAB({
                p: i.spc,
                c: "abutGradBl skButDone",
                v: "Recast Line",
                oc: function(t) {
                    Skill.sendStartCmd(i)
                }
            }) : CAB({
                p: i.spc,
                c: "abutGradBl skButDone",
                v: Skill.properties[i.type].again,
                oc: function(t) {
                    Skill.drawStart(i)
                }
            }),
            Plr.checkItemAutoStack(e),
            i.refreshGroups && (i.refreshGroups = !1,
            Grp.refresh())
        }
    },
    setMeters: function(t, e, s) {
        var a = Skill.get();
        if (a.started) {
            4 != a.type && e / 100 != a.bars[1].perc && Skill.R("!");
            for (var i = 0; i < 2; i++)
                a.bars[i].set((0 == i ? t : e) / 100);
            0 < s && createDmgText(a.o, (a.w - 75) / 2 + rnd(-20, 20), 20 + rnd(-5, 5), Skill.properties[a.type].counters[s - 1], "")
        }
    },
    proc: function(t, e) {
        var s = Skill.get();
        if (s)
            switch (t) {
            case 0:
                Skill.startSkill(e[0], e[1], e[2]);
                break;
            case 1:
                Skill.setMeters(e[0], e[1], e[2]);
                break;
            case 2:
                Skill.stopSkill(!0, e[0], e[1], e[2]);
                break;
            case 3:
                createDmgText(s.o, (Skill.w - 150) / 2, 20, "Your fishing rod snapped.", "", 2),
                Skill.itemId = 0
            }
    }
};
function closeLake() {
    Skill.close(),
    bg.dock && (Gs.char.setEquip(0, Plr.c[29]),
    bg.dock = null)
}
function showLake() {
    clearBG(1),
    bg.dock = cS(bg, {
        s: "svg/iconDock.svg",
        w: 400,
        h: 400,
        c: "fishDock"
    }),
    CAB({
        p: bg,
        c: "abutGradBl fishBTT",
        v: "Back to Town",
        oc: function(t) {
            closeLake(),
            Town.show()
        }
    }),
    Inv.setTab(2),
    Skill.tog(0),
    Gs.char.setEquip(0, 10)
}
function showBakery() {
    Inv.setTab(2),
    Skill.tog(1)
}
function showSuffusencing() {
    Inv.setTab(2),
    Skill.tog(4)
}
function showGlyphing() {
    Inv.setTab(1),
    Skill.tog(2)
}
function showTransmuting() {
    Inv.setTab(1),
    Skill.tog(3)
}
var SysMsgs = ["Login failed.", "Logging off.", "Too many people connected. Try again later.", "You cannot create any more characters. You must delete one if you wish to create another.", "Error: Only alphanumeric characters are allowed in your character name.", "Error: You must choose a unique character name.", "You do not meet the level requirements of this item.", "Your class cannot use this item.", "Your inventory is full. Drop something first.", "You do not have access to the market. You do not have FG access.", "You already have the maximum allowed items for sale on the market. Please wait for one to sell, or remove one, if you wish to sell this item.", "Gold password incorrect. Failed attempt logged.", "You must wait 24 hours before you can remove an item from the market.", "Error: Flood control. Please wait a moment and try again.", "Error: Maximum searches exceeded for this session.", "Error: You do not have enough Forum Gold for this purchase. <u><a target='_blank' href='https://forums.d2jsp.org/index.php?act=purchaseGold'>Click Here to Buy More Forum Gold</a></u>", "Error: Gold password incorrect.", "Error: You must wait 2 hours before you can edit the cost of an item on the market.", "Transfer failed, that character cannot accept more items.", "Server shutting down, refresh your page in a few minutes.", "", "***WARNING: If you cheat (bot, macro, auto click, etc), you will be banned from Ladder Slasher and d2jsp.***", "Error: Incorrect version of Ladder Slasher. You must update your Ladder Slasher client before you can connect.", "Do not disturb mode has been enabled.", "Do not disturb mode has been disabled.", "This player is not currently accepting private messages.", "", "Error: Out of vault slots.", "Error: That user is not in the same guild.", "Error: No guild transfer days remaining.", "Error: That user does not have a Vault subscription.", "Error: That user is blocking item transfers.", "Error: User not online.", "Snarls of defiance greet you as you stumble upon a horde of monsters!", "An unholy aura permeates the room, making it difficult to breathe.", "Some monsters leap from the shadows to ambush you!", "Error: The item must be magical or higher.", "Error: The item must not be magical.", "Your character sex has been set. Please logout and back in for this to take effect.", "Error: No such command.", "You fall through a trapdoor.", "Use the arrow keys or W A S D to move and turn.", "Whiffs of nostalgia inundate you.", "Snarls of defiance greet you as you stumble upon a swarm of monsters!", "The air buzzes with magical interference as shrill laughter rips through the silence.", "Echoing giggles of excitement confuse and disorient you.", "You must be in town to join a group. Return to town and try again.", "You must be in town to leave a group. Return to town and try again.", "Easy mode is activated.", "Easy mode is deactivated.", ""];
function Tip(t, e, s) {
    this.o = CE("DIV", (s = s || {}).text ? null : stage, "tipBox" + (s.c ? " " + s.c : "")),
    this.objs = [],
    this.p = t,
    (this.d = s).x = evt.getCX(e),
    s.y = evt.getCY(e),
    this.ox = s.x || 0,
    this.oy = s.y || 0,
    this.count = 0,
    this.w = 0,
    s.text ? (this.add(s.text, "fcb fwb"),
    aE(t, "mouseover", this.over.bind(this)),
    aE(t, "mouseout", this.out.bind(this)),
    t.tip = this) : (this.o.style.left = this.ox + "px",
    this.o.style.top = this.oy + "px")
}
Tip.prototype.over = function(t) {
    stage.appendChild(this.o),
    this.getSize(),
    this.ox = evt.getCX(t),
    this.oy = evt.getCY(t),
    this.d.tipY && this.p.offsetHeight && (this.oy -= this.p.offsetHeight),
    this.finish()
}
,
Tip.prototype.del = function() {
    if (this.tm && (this.tm = clearInterval(this.tm)),
    this.added)
        return this.added = !1,
        this.o.parentNode.removeChild(this.o),
        0
}
,
Tip.prototype.out = function(t) {
    this.del()
}
,
Tip.prototype.checkParent = function() {
    document.body.contains(this.p) || this.del()
}
,
Tip.prototype.add = function(t, e) {
    "string" == typeof t ? this.objs[this.count] = CTD(this.o, t, "fs11 tac" + (e ? " " + e : "")) : this.o.appendChild(t),
    this.count++
}
,
Tip.prototype.getSize = function() {
    this.w = this.o.offsetWidth,
    this.h = this.o.offsetHeight
}
,
Tip.prototype.move = function() {
    this.oy + this.h > sizeY && (this.oy = sizeY - this.h),
    this.ox + this.w > sizeX && (this.ox = sizeX - this.w),
    this.ox < 0 && (this.ox = 0),
    this.oy < 0 && (this.oy = 0),
    this.o.style.left = this.ox + "px",
    this.o.style.top = this.oy + "px"
}
,
Tip.prototype.finish = function() {
    this.getSize(),
    this.move(),
    this.added = !0,
    this.tm || (this.tm = setInterval(this.checkParent.bind(this), 250))
}
;
var Abilities = {
    data: [[], ["Powerstrike", 0, 0, 1, "Hits one target for a lot"], ["Bottomsup", 0, 0, 1, "Hits the bottom row"], ["Topsmash", 0, 0, 6, "Hits the top row"], ["Knockdown", 1, 0, 1, "Hits any row"], ["Retribution", 1, 0, 5, "Hits one target for a lot"], ["Healrage", 1, 0, 6, "Hits one target for a lot"], ["Backstab", 2, 0, 1, "Hits the back column"], ["Castabove", 2, 1, 1, "Hits the top row"], ["Backastrophe", 2, 0, 2, "Hits the back two columns"], ["Piercecast", 3, 1, 2, "Hits any row"], ["Powercast", 3, 1, 2, "Hits one target for a lot"], ["Pillarcast", 3, 1, 2, "Hits any column"], ["Multiheal", 4, 1, 3, "Heals all allies"], ["Salvation", 4, 1, 5, "Heals one ally for a lot"], ["Healtank", 4, 1, 1, "Heals the front row"], ["Multistrike", 5, 0, 1, "Hits all enemies"], ["Frontcast", 5, 1, 1, "Hits the front column"], ["Twohitback", 5, 0, 5, "Hits two targets"], ["Revenge", 6, 0, 5, "Hits the first two columns"], ["Holycross", 6, 1, 1, "Hits enemies in a plus pattern"], ["Healback", 6, 1, 1, "Heals the back row"], ["Doublestrike", 7, 0, 1, "Hits two targets"], ["Xcast", 7, 1, 1, "Hits enemies in an X pattern"], ["Crossstrike", 7, 0, 1, "Hits enemies in a plus pattern"], ["Pathslash", 8, 0, 1, "Hits the front column"], ["Jumpattack", 8, 0, 1, "Hits any column"], ["Backcast", 8, 1, 1, "Hits the back row"], ["Multicast", 9, 1, 2, "Hits all enemies"], ["Doublecast", 9, 1, 2, "Hits two targets"], ["Sapcast", 9, 1, 3, "Hits one target for a lot"], ["Wildswing", 10, 0, 5, "Hits targets randomly"], ["Slapdash", 10, 0, 1, "Hits targets randomly"], ["Xin", 10, 0, 6, "Hits enemies in an X pattern"], ["Paraphysical", 11, 1, 5, "Hits targets randomly"], ["Chaos", 11, 1, 2, "Hits targets randomly"], ["Degenerate", 11, 1, 3, "Hits targets randomly"]],
    types: ["Weapon", "Cast", "Heal", "Passive", "Hit Taken", "Damage Healed"],
    hotkeys: ["Ctrl", "Alt", "Shift"],
    addTip: function(t, e) {
        t.add(Abilities.data[e][0], "fcb fwb"),
        t.add(CStats.classData[Abilities.data[e][1]][0] + " Ability", "fcBlue1"),
        t.add(Abilities.data[e][4], "fcBlue1"),
        t.add("Charges with " + Abilities.types[Abilities.data[e][3] - 1], "fcBlue1")
    },
    transformColors: [[1, 1, 1, 66, -100, -100], [1, 1, 1, 66, -25, -25], [1, 1, 1, -25, -25, 66]],
    colorTransform: function(t, e) {
        for (var s, a, i = 0; i < t.childNodes.length; i++)
            (s = t.childNodes[i].getAttribute("stroke")) && "none" != s && (a = getRGBTransform(parseInt(s.substring(1, s.length), 16), e),
            t.childNodes[i].setAttributeNS(null, "stroke", a)),
            "none" != (s = t.childNodes[i].getAttribute("fill")) && (a = getRGBTransform(parseInt(s.substring(1, s.length), 16), e),
            t.childNodes[i].setAttributeNS(null, "fill", a))
    }
};
function AI(t, e, s, a) {
    this.o = CE("div", t, "cp abilityIcon"),
    this.id = e,
    this.icon = mSVG(this.o, {
        n: svgs["ab" + e]
    }),
    this.adjust = Plr.c[5] == Abilities.data[e][1] ? 5 : CStats.classData[Abilities.data[e][1]][1] > Plr.c[14] ? 15 : 10;
    t = [],
    t = 15 == this.adjust ? Abilities.transformColors[0] : 10 == this.adjust ? Abilities.transformColors[1] : Abilities.transformColors[2];
    Abilities.colorTransform(this.icon, t),
    aE(this.o, evt.MD, this.down.bind(this)),
    aE(this.o, "mouseover", this.over.bind(this)),
    aE(this.o, "mouseout", this.out.bind(this)),
    aE(this.o, "keyup", this.keyup.bind(this)),
    this.o.tabIndex = 9,
    this.setLevel(Plr.c[55][e])
}
function AHK(t, e, s, a, i) {
    this.o = CE("div", t, "cp abilityHotKey"),
    this.idx = e,
    this.key = CTD(this.o, Settings.getKB(Plr.keycodes[35 + e], Plr.keymap[35 + e]), "stAbHK ds2 pen"),
    s && this.setIcon(s),
    aE(this.o, evt.MD, this.down.bind(this)),
    aE(this.o, "mouseover", this.over.bind(this)),
    aE(this.o, "mouseout", this.out.bind(this))
}
function AC(t, e, s) {
    this.o = CE("div", t, "bbAbility abutGradBl"),
    this.iconObj = CE("div", this.o, "abIcon"),
    CTD(this.o, Abilities.data[e][0], "abLabel"),
    this.id = e,
    this.icon = mSVG(this.iconObj, {
        n: svgs["ab" + e]
    }),
    this.charge = CTD(this.iconObj, s + "%", "abPerc"),
    aE(this.o, evt.MD, this.down.bind(this)),
    aE(this.o, "mouseover", this.over.bind(this)),
    aE(this.o, "mouseout", this.out.bind(this))
}
AI.prototype.setLevel = function(t) {
    t && (this.level || (this.level = CTD(this.o, "", "stAbLvl ds2")),
    this.level.t.nodeValue = t.toString())
}
,
AI.prototype.setKeySlot = function(t) {
    var e;
    2 <= Abilities.data[this.id][2] || (Plr.cd.ab[t] = this.id,
    (e = Stats.get()) && e.abObjs[t].setIcon(this.id))
}
,
AI.prototype.keyup = function(t) {
    Plr.c[55][this.id] && (t.abObj = this,
    doKeyDown(t))
}
,
AI.prototype.down = function(t) {
    Plr.c[8] && njs.sendBytes(16, this.id)
}
,
AI.prototype.over = function(t) {
    if (!this.tip) {
        this.tip = new Tip(this.o,t),
        Abilities.addTip(this.tip, this.id);
        t = Plr.c[55][this.id];
        if (Plr.c[8] && (t = t || 0,
        this.tip.add("Click to increase ability to " + (Math.floor((100 - t) / this.adjust) + t) + "%", "fcb")),
        t) {
            for (var e = 0; e < 3; e++)
                this.tip.add("Press " + Settings.getKB(Plr.keycodes[35 + e], Plr.keymap[35 + e]) + " to assign to Ability Key " + (e + 1));
            this.o.focus()
        }
        this.tip.finish()
    }
}
,
AI.prototype.closeTip = function() {
    this.tip && (this.tip = this.tip.del())
}
,
AI.prototype.out = function(t) {
    this.closeTip(),
    this.o.blur()
}
,
AHK.prototype.setIcon = function(t) {
    this.i = t,
    this.icon && this.o.removeChild(this.icon),
    this.icon = mSVG(this.o, {
        n: svgs["ab" + t]
    }),
    Abilities.colorTransform(this.icon, Abilities.transformColors[2]),
    this.o.insertBefore(this.icon, this.key)
}
,
AHK.prototype.down = function(t) {
    Plr.cd.ab[this.idx] = 0,
    this.i = 0,
    this.icon && this.o.removeChild(this.icon),
    this.icon = null
}
,
AHK.prototype.over = function(t) {
    !this.tip && this.i && (this.tip = new Tip(this.o,t),
    Abilities.addTip(this.tip, this.i),
    this.tip.add("Click to remove from this hotkey assignment", "fcb"),
    this.tip.finish())
}
,
AHK.prototype.closeTip = function() {
    this.tip && (this.tip = this.tip.del())
}
,
AHK.prototype.out = function() {
    this.closeTip()
}
,
AC.prototype.setCharge = function(t) {
    this.charge.t.nodeValue = t + "%"
}
,
AC.prototype.down = function(t) {
    Gs.abSel(this.id)
}
,
AC.prototype.over = function(t) {
    !this.tip && this.id && (this.tip = new Tip(this.o,t),
    this.tip.add(Abilities.data[this.id][0] + " Ability", "fcb fwb"),
    this.tip.add(Abilities.data[this.id][4], "fcBlue1"),
    this.tip.finish())
}
,
AC.prototype.closeTip = function() {
    this.tip && (this.tip = this.tip.del())
}
,
AC.prototype.out = function(t) {
    this.closeTip()
}
,
AC.prototype.select = function(t) {
    this.sel || (this.sel = 1,
    this.o.classList.add("gradRed"))
}
,
AC.prototype.unselect = function(t) {
    this.sel && (this.o.classList.remove("gradRed"),
    this.sel = 0)
}
,
AC.prototype.del = function() {
    this.closeTip(),
    this.o.parentNode.removeChild(this.o),
    this.sel = this.icon = this.charge = this.o = null
}
;
var stage, bg, sizeX, sizeY, njs, ws, Cata = {
    click: function() {
        njs.sendBytes(70, 1)
    },
    gotoTown: function() {
        Drops.clear(),
        Cata.mobs = [],
        Plr.inCombat = 0,
        Plr.startHealTimer(),
        Gs.remDoor(),
        Skill.close(),
        Gs.hideControlButtons(),
        Gs.char.setPosition(2),
        Town.show()
    },
    setWhistleLvl: function(t) {
        isNaN(t) || (t = parseInt(t)) < 1 || t > Plr.c[6] || (Cata.whistleLvl = t,
        Log.add("Whistle level set to: " + t))
    },
    whistle: function() {
        var t;
        Plr.g && !Plr.inCombat && ((t = (t = Cata.whistleLvl || Plr.c[6]) < 1 || t > Plr.c[6] ? Plr.c[6] : t) != Cata.lastWhistle && (Log.add("Whistling for level " + t + " monsters.  (Type /whistle #  to change to a different level.)"),
        Cata.lastWhistle = t),
        njs.sendData([1, 78, 4, t]))
    },
    enter: function(t, e) {
        switch (Plr.g.setZone(e),
        t) {
        case 1:
            Plr.g.isLeader() && Log.add(41),
            Maze.clear();
        case 0:
            Plr.stopHealTimer(),
            closeLake(),
            clearBG(e || 2),
            Drops.clear(),
            Gs.char.setPosition(Plr.c[48], 1),
            Gs.addDoor(),
            Cata.mobs = [];
            break;
        case 2:
            2 == bg.bgT && clearBG(e || 2),
            Maze.clear()
        }
    },
    engage: function() {
        njs.sendBytes(71, 64)
    },
    clear: function() {
        bg.maze.pool && (bg.maze.removeChild(bg.maze.pool),
        bg.maze.pool = null,
        Skill.close()),
        bg.maze.shrine && (bg.maze.removeChild(bg.maze.shrine),
        bg.maze.shrine = null),
        bg.maze.chest && (bg.maze.removeChild(bg.maze.chest),
        bg.maze.chest = null),
        bg.mobA && (bg.removeChild(bg.mobA),
        bg.mobA = null)
    }
}, Maze = {
    W: 340,
    create: function() {
        Plr.inCombat || (bg.maze || (clearBG(Plr.g.zone || 2),
        bg.maze = CE("DIV", bg, "mazeBox"),
        bg.mazeMask = mSVG(bg.maze, {
            vb: "0 0 " + Maze.W + " " + Maze.W,
            c: "mazeSVG"
        }),
        bg.mapMask = mSVG(bg.maze, {
            vb: "0 0 " + Maze.W + " " + Maze.W,
            c: "mapSVG"
        })),
        Cata.mobs = [],
        Drops.purge(),
        Gs.togEng(0),
        Maze.draw())
    },
    move: function(t) {
        njs.sendBytes(71, t)
    },
    getRow: function(t, e, s) {
        for (var a = 0, i = 5; a < e; a++)
            Maze.M[a] || (Maze.M[a] = []),
            Maze.M[a][s] = t.getUint8(i++),
            128 & Maze.M[a][s] && (Maze.M[a][s] -= 128,
            Maze.S[a] || (Maze.S[a] = []),
            Maze.S[a][s] = Maze.M[a][s])
    },
    getRoom: function(t, e, s, a) {
        if (Maze.S[t] || (Maze.S[t] = []),
        Maze.S[t][e] = s,
        Plr.g.x = t,
        Plr.g.y = e,
        a && (16 & a && !(64 & Maze.S[t][e]) && (Maze.S[t][e] |= 64),
        32 & a && !(128 & Maze.S[t][e]) && (Maze.S[t][e] |= 128),
        64 & a) && !(256 & Maze.S[t][e]) && (Maze.S[t][e] |= 256),
        bg.maze)
            Drops.purge(),
            Cata.clear(),
            Gs.togEng(0),
            Maze.draw();
        else {
            if (!Plr.inCata())
                return;
            Maze.create()
        }
        if (a) {
            if (1 & a && (Log.add("A warm light heals you and your party."),
            Sound.play(1)),
            2 & a && Log.add("The room flashes and you find yourself in new surroundings."),
            4 & a && (bg.maze.pool = cS(bg.maze, {
                s: "svg/iconChest.svg",
                c: "cChest"
            }),
            Log.add("You stumble upon a treasure chest."),
            Gs.togEng(1)),
            8 & a && Log.add("An evil presence sends a shiver down your spine."),
            16 & a)
                for (var i in Plr.g.members)
                    if (2 == Plr.g.members[i][1] || 7 == Plr.g.members[i][1] || 8 == Plr.g.members[i][1]) {
                        Log.add("There is a trapdoor in this room." + (Plr.g.isLeader() ? " Press Z to descend." : ""));
                        break
                    }
            32 & a && Log.add("There is a dark mysterious pool of water in this room."),
            64 & a && Log.add("There is an enigmatic emblem in this room.")
        }
        Maze.checkAutoPilot()
    },
    clear: function() {
        Maze.M = [],
        Maze.S = [],
        Plr.g.d = 1
    },
    setDir: function(t) {
        Plr.g.d = t,
        bg.maze && (Maze.draw(),
        Maze.checkAutoPilot())
    },
    draw: function() {
        if (null != Plr.g.x) {
            var t, e, s, a, i, o = bg.mazeMask, r = (dAC(o),
            SVGE(o, "defs", {
                _c: [{
                    _t: "linearGradient",
                    id: "mazeGrad1",
                    x1: "0%",
                    y1: "0%",
                    x2: "0%",
                    y2: "100%",
                    _c: [{
                        _t: "stop",
                        offset: "0%",
                        "stop-color": Plr.g.zoneSkyCSS,
                        "stop-opacity": 1
                    }, {
                        _t: "stop",
                        offset: "50%",
                        "stop-color": Plr.g.zoneSkyHCSS,
                        "stop-opacity": 1
                    }, {
                        _t: "stop",
                        offset: "50.001%",
                        "stop-color": Plr.g.zoneFloorHCSS,
                        "stop-opacity": 1
                    }, {
                        _t: "stop",
                        offset: "100%",
                        "stop-color": Plr.g.zoneWallCSS,
                        "stop-opacity": 1
                    }]
                }]
            }),
            SVGE(o, "rect", {
                width: Maze.W,
                height: Maze.W,
                fill: "url(#mazeGrad1)",
                stroke: "none",
                x: 0,
                y: 0
            }),
            {
                1: [1, 8, 2],
                4: [4, 2, 8],
                2: [2, 1, 4],
                8: [8, 4, 1]
            }), l = [0, -1, 1], n = Plr.g.d, c = Plr.g.x, d = Plr.g.y, h = 6, p = Maze.M;
            switch (n) {
            case 1:
                for (t = d - 6 + 1; t <= d; t++)
                    for (s = Math.floor(--h / 2) + 1,
                    a = 0; a < 3; a++)
                        for (e = c - s; e <= c + s; e++)
                            p[e] && p[e][t] && (i = e - c,
                            p[e][t] & r[n][a]) && Maze.drawWall(h, i, l[a]);
                break;
            case 4:
                for (t = d + 6 - 1; d <= t; t--)
                    for (s = Math.floor(--h / 2) + 1,
                    a = 0; a < 3; a++)
                        for (e = c + s; c - s <= e; e--)
                            p[e] && p[e][t] && (i = c - e,
                            p[e][t] & r[n][a]) && Maze.drawWall(h, i, l[a]);
                break;
            case 2:
                for (t = c + 6 - 1; c <= t; t--)
                    for (s = Math.floor(--h / 2) + 1,
                    a = 0; a < 3; a++)
                        for (e = d - s; e <= d + s; e++)
                            p[t] && p[t][e] && (i = e - d,
                            p[t][e] & r[n][a]) && Maze.drawWall(h, i, l[a]);
                break;
            case 8:
                for (t = c - 6 + 1; t <= c; t++)
                    for (s = Math.floor(--h / 2) + 1,
                    a = 0; a < 3; a++)
                        for (e = d + s; d - s <= e; e--)
                            p[t] && p[t][e] && (i = d - e,
                            p[t][e] & r[n][a]) && Maze.drawWall(h, i, l[a])
            }
            for (t in 64 & Maze.S[c][d] ? Maze.drawTD() : 128 & Maze.S[c][d] ? Maze.drawWell() : 256 & Maze.S[c][d] && Maze.drawEmblem(),
            dAC(bg.mapMask),
            Maze.S)
                for (e in Maze.S[t])
                    Map.drawRoom(t, e);
            Map.drawPos()
        }
    },
    drawWall: function(t, e, s) {
        var a, i = Maze.W / (t + 1.5), o = (Maze.W - i) / 2, r = 0, l = 0, n = (0 != e && (r = e * i),
        bg.mazeMask), c = getRGBShade(Plr.g.zoneWallRGB, -4 * (t - 1 + (0 == s ? -1 : 0))), d = getRGBShade(Plr.g.zoneWallRGB, -4 * (t - 1 - 1));
        0 == s ? SVGE(n, "rect", {
            width: i,
            height: i,
            fill: c,
            stroke: d,
            "stroke-width": 1,
            x: o + r + "px",
            y: o + "px"
        }) : (t = Maze.W / (t + .5),
        a = (Maze.W - t) / 2,
        0 != e && (l = e * t),
        drawShape(n, -1 == s ? [a + l, a, o + r, o, o + r, o + i, a + l, a + t] : [i + o + r, o, t + a + l, a, t + a + l, t + a, i + o + r, i + o], d, c))
    },
    drawTD: function() {
        var t = Maze.W / 1.5
          , t = (Maze.W - t) / 2;
        aE(drawShape(bg.mazeMask, [15, Maze.W, t, Maze.W - t + 15, Maze.W - t, Maze.W - t + 15, Maze.W - 15, Maze.W], "#52341c", "#62442c"), evt.MC, function(t) {
            Maze.move(5)
        })
    },
    drawWell: function() {
        var t;
        bg.maze.pool || (aE(t = bg.maze.pool = cS(bg.maze, {
            s: "svg/iconWell.svg",
            c: "cIWell"
        }), evt.MC, function(t) {
            Skill.tog(0)
        }),
        evt.addDropEvt(t, function(t) {
            t.item[7] ? Log.add(37) : njs.sendData([1, 20, 1, 9, 8, t.i])
        }))
    },
    drawEmblem: function() {
        bg.maze.shrine || aE(bg.maze.shrine = cS(bg.maze, {
            s: "svg/iconTotem.svg",
            c: "cEmblem"
        }), evt.MC, function(t) {
            njs.sendData([1, 20, 1, 10])
        })
    },
    checkAutoPilot: function() {
        var t, e, s;
        Plr.autoPilot && Plr.g && Maze.M && bg.maze && Plr.g.isLeader() && (!Gs.engage || "none" == Gs.engage.style.display) && (s = 0,
        t = 500,
        (e = Maze.M[Plr.g.x][Plr.g.y]) & Plr.g.d ? (s = 2,
        1 != Plr.g.prevDir || e & (e = (e = Plr.g.d >> 1) < 1 ? 8 : e) || (s = 0),
        t = 250) : s = 1,
        Plr.g.prevDir = s,
        setTimeout(function() {
            Maze.move(Plr.g.prevDir)
        }, t))
    }
}, Map = {
    roomSize: 8,
    drawPos: function() {
        var t, e = Map.roomSize - 2.5, s = 10 + Plr.g.x * Map.roomSize + 1, a = 10 + Plr.g.y * Map.roomSize + 1;
        switch (Plr.g.d) {
        case 1:
            t = [s, a + e, s + e, a + e, s + e / 2, a];
            break;
        case 8:
            t = [s + e, a, s + e, a + e, s, a + e / 2];
            break;
        case 2:
            t = [s, a, s, a + e, s + e, a + e / 2];
            break;
        case 4:
            t = [s, a, s + e, a, s + e / 2, a + e]
        }
        drawShape(bg.mapMask, t, Plr.g.miniMapColor, Plr.g.miniMapColor)
    },
    drawRoom: function(t, e) {
        var s = bg.mapMask
          , a = Maze.S[t][e]
          , i = Map.roomSize
          , t = 10 + t * i
          , e = 10 + e * i
          , o = (SVGE(s, "rect", {
            x: t,
            y: e,
            width: i,
            height: i,
            fill: "#22AA22",
            "fill-opacity": .3,
            stroke: "none"
        }),
        [])
          , o = (8 & a && o.push("M" + t, e, "L" + t, e + i),
        4 & a && o.push("M" + t, e + i, "L" + (t + i), e + i),
        2 & a && o.push("M" + (t + i), e + i, "L" + (t + i), e),
        1 & a && o.push("M" + (t + i), e, "L" + t, e),
        o.length && SVGE(s, "path", {
            fill: "none",
            stroke: Plr.g.miniMapColor,
            "stroke-width": 1,
            d: o.join(" ")
        }),
        .75 * i)
          , r = (i - o) / 2
          , i = i / 2;
        64 & a ? SVGE(s, "rect", {
            width: o,
            height: o,
            fill: "#333333",
            x: t + r,
            y: e + r
        }) : 128 & a && SVGE(s, "circle", {
            stroke: "#aaa",
            fill: "#3333FF",
            cx: t + i,
            cy: e + i,
            r: o / 2
        })
    }
}, CS = {
    show: function() {
        Gs.del(),
        Popup.closeAll(),
        clearBG(),
        CS.buildList()
    },
    getList: function() {
        clearBG(),
        Plr.chars = {},
        njs.sendBytes(10, 1)
    },
    buildList: function() {
        var t, e, s, a;
        for (s in Sound.loaded() || (Plr.soundVol = parseInt(localStorage.soundVol),
        isNaN(Plr.soundVol) && (Plr.soundVol = 10),
        Sound.adjVol(Plr.soundVol)),
        clearBG(),
        bg.sel = null,
        bg.charList = CE("div", bg, "charList"),
        aE(bg.charList, evt.MC, function(t) {
            bg.sel = null,
            this.classList.remove("clHide"),
            CS.clearBG()
        }),
        bg.charSel = CE("div", bg, "charSel"),
        Plr.sChars = [],
        Plr.chars)
            Plr.sChars.push(s);
        for (Plr.sChars = Plr.sChars.sort(function(t, e) {
            return parseInt(t) - parseInt(e)
        }),
        a = e = 0; a < Plr.sChars.length; a++)
            s = Plr.sChars[a],
            (t = CE("div", bg.charList, "clChar")).charIndex = e,
            t.charId = s,
            t.classId = Plr.chars[s][5],
            -1 != t.classId && (t.char = new Char(t,{
                c: "clHead",
                x: 1 == Plr.chars[s][3] ? -10 : 0,
                y: 1 == Plr.chars[s][3] ? 0 : -10,
                s: 180,
                id: 0,
                classId: t.classId,
                sex: Plr.chars[s][3],
                weapon: Plr.chars[s][29],
                armor: Plr.chars[s][30]
            }),
            t.char.c.style.position = "absolute"),
            CTD(t, Plr.chars[s][2], "cName"),
            CTD(t, "Lv " + Plr.chars[s][6] + (1 == Plr.chars[s][4] ? " (HC" + (Plr.chars[s][11] ? " - DEAD" : "") + ")" : "") + " " + (-1 == Plr.chars[s][5] ? "[No Class Selected]" : CStats.classData[Plr.chars[s][5]][0]), "cDetails"),
            aE(t, evt.MC, function(t) {
                return CS.setSlot(this),
                eSP(t)
            }),
            ++e;
        CAB({
            p: bg.charList,
            c: "abutGradBl clCreate",
            v: "Create New Character",
            oc: function(t) {
                CS.create(0)
            }
        }),
        CAB({
            p: bg,
            c: "abutGradBl clLogout",
            v: "Logout",
            oc: function(t) {
                ws.close(4e3)
            }
        }),
        mSVG(bg.charList, {
            n: svgs.menuV,
            c: "clArrow",
            ov: [[0, "stroke", "#FFF"], [0, "stroke-width", .25]]
        })
    },
    select: function(t) {
        Plr.char = t,
        Plr.c = Plr.chars[t],
        Plr.chars[t][40] = Plr.chars[t][43] = Plr.chars[t][44] = Plr.chars[t][45] = 0,
        Plr.items = {},
        Plr.glyphs = {}
    },
    clearBG: function() {
        bg.char && (bg.char.char.del(),
        bg.char.char = null,
        bg.charSel.removeChild(bg.char),
        bg.char = 0)
    },
    play: function() {
        var t = bg.sel;
        t && -1 != Plr.chars[t.charId][5] && njs.sendData([1, 5, 1, 0, 8, t.charId])
    },
    setSlot: function(t) {
        if (bg.sel == t)
            return CS.play();
        bg.charList.classList.add("clHide"),
        CS.clearBG();
        var e = (bg.sel = t).charId
          , s = CE("div", bg.charSel);
        (bg.char = s).charId = e,
        CTD(s, Plr.chars[e][2], "cName"),
        CTD(s, "Lv " + Plr.chars[e][6] + (1 == Plr.chars[e][4] ? " (HC" + (Plr.chars[e][11] ? " - DEAD" : "") + ")" : "") + " " + (-1 == Plr.chars[e][5] ? "[No Class Selected]" : CStats.classData[Plr.chars[e][5]][0]), "cDetails"),
        -1 != t.classId ? (s.char = new Char(CE("div", s, "clCharWrap"),{
            c: "clSelChar",
            x: 10,
            y: 20,
            s: 275,
            id: 0,
            classId: t.classId,
            sex: Plr.chars[e][3],
            weapon: Plr.chars[e][29],
            armor: Plr.chars[e][30]
        }),
        Char.isDead(e) || CAB({
            p: s,
            c: "abutGradBl clPlay",
            v: "Play!",
            oc: CS.play
        })) : (s.char = cS(CE("div", s, "clCharWrap"), {
            s: "blank.png",
            w: 120,
            h: 249
        }),
        s.char.del = function() {}
        ,
        Char.isDead(e) || CAB({
            p: s,
            c: "abutGradBl clPlay",
            v: "Select Class",
            oc: function(t) {
                CS.create(1)
            }
        })),
        -1 == t.classId || Char.isDead(e) || (CAB({
            p: s,
            c: "abutGradBl clButton",
            v: "Reroll",
            oc: function(t) {
                bg.sel && -1 != Plr.chars[bg.sel.charId][5] && CS.showConf(1, "REROLL")
            }
        }),
        CAB({
            p: s,
            c: "abutGradBl clButton",
            v: "Rename",
            oc: function(t) {
                bg.sel && CS.create(2)
            }
        })),
        CAB({
            p: s,
            c: "abutGradBl clButton",
            v: "Delete",
            oc: function(t) {
                bg.sel && CS.showConf(2, "DELETE")
            }
        }),
        CS.clearConf()
    },
    showConf: function(t, e) {
        CS.clearConf(),
        bg.conf = CE("div", bg.charSel, "ccOverlay");
        var s = CE("div", bg.conf, "ccInlay");
        CTD(s, e + " Character", "cciHead"),
        CTD(s, "Note: This change is permanent and cannot be undone!", "cciBody"),
        CTD(s, "Type " + e + " to confirm:", "cciBody"),
        bg.confT = CFI(s, {
            c: "cciInput",
            ml: e.length
        }),
        bg.confT.focus(),
        bg.confCmd = t,
        bg.confText = e,
        aE(bg.confT, "keyup", function(t) {
            this.value.toUpperCase() == bg.confText && (2 == bg.confCmd && (Plr.chars = {}),
            njs.sendData([1, 5, 1, bg.confCmd, 8, bg.sel.charId]),
            CS.clearConf())
        }),
        CAB({
            p: s,
            c: "abutGradBl cciCancel",
            v: "Cancel",
            oc: CS.clearConf
        })
    },
    clearConf: function() {
        bg.conf && bg.charSel.removeChild(bg.conf),
        bg.conf = null
    },
    doRename: function() {
        Plr.chars[bg.charId][2] = bg.cName.value,
        CS.show()
    },
    create: function(t) {
        var e = t ? bg.sel.charId : 0;
        clearBG(),
        bg.charId = e;
        var s, a, i, o = CE("div", bg, "createCharWrap");
        switch (bg.headText = CTD(o, "Create a New Character", "ccTitle"),
        1 != t ? (s = CE("div", o, "ccLabelTextWrap"),
        bg.cNameLabel = CTD(s, "Character Name:", "ccCName"),
        bg.cName = CFI(s, {
            c: "ccTxtName",
            ml: 16
        })) : s = o,
        t) {
        case 1:
            CS.buildClassList(o, Plr.chars[e][14]),
            bg.charW = CE("div", o, "ccCharWrap"),
            bg.headText.t.nodeValue = "Select New Character Class",
            a = "Select Class",
            i = function(t) {
                var e = bg.tbc.selected ? bg.tbc.selected.value : -1;
                -1 != e && (njs.sendData([1, 5, 1, 3, 8, bg.charId, 1, e]),
                Plr.chars = {})
            }
            ;
            break;
        case 2:
            bg.headText.t.nodeValue = "Select New Character Name",
            CTD(o, ["Renaming: " + Plr.chars[bg.charId][2], "A character rename costs 100 forum gold. This action is non-refundable and permanent."], "ccRenameLabel"),
            CTD(s = CE("div", o, "ccLabelTextWrap"), "Gold Password:", "ccGPwd"),
            bg.gpwd = CFI(s, {
                t: "password",
                c: "ccTxtGPwd"
            }),
            a = "Rename Character",
            i = function(t) {
                var e, s = bg.cName.value;
                s && s != Plr.chars[bg.charId][2] && (e = rcgp(bg.gpwd.value),
                njs.sendData([1, 5, 1, 4, 8, bg.charId, 100, s, 100, e]))
            }
            ;
            break;
        default:
            bg.hardcore = CCBL(s, {
                c: "ccCBCore",
                label: "Hardcore",
                id: "csHC"
            }),
            bg.sex = new Radio(o,{
                c: "ccSex",
                oc: CS.selectClass
            }),
            t = bg.sex.add("Male", 1),
            bg.sex.select(t),
            bg.sex.add("Female", 2),
            CS.buildClassList(o, 0),
            bg.charW = CE("div", o, "ccCharWrap"),
            CTD(o, "Creating a character or using this game signifies that you have read and agree to the terms and conditions set forth in the Site Disclaimer. All characters and items are the property of d2jsp.org.", "ccDisc"),
            a = "Create Character",
            i = function(t) {
                var e, s, a = bg.cName.value, i = bg.tbc.selected ? bg.tbc.selected.value : -1;
                "" != a && -1 != i && (e = bg.hardcore.cb.checked ? 1 : 0,
                s = bg.sex.selected.value,
                njs.sendData([1, 5, 1, 5, 1, i, 1, e, 1, s, 100, a]))
            }
        }
        CAB({
            p: s = CE("div", o, "ccButtonWrap"),
            c: "abutGradBl ccSubmit",
            v: a,
            oc: i
        }),
        CAB({
            p: s,
            c: "abutGradBl ccCancel",
            v: "Cancel",
            oc: CS.show
        })
    },
    buildClassList: function(t, e) {
        var s, a;
        for (bg.sel = 0,
        bg.tbc = new Radio(t,{
            c: "ccClassList",
            oc: CS.selectClass
        }),
        a = 0; a < CStats.classData.length; a++)
            CStats.classData[a][1] <= e && (s = CStats.classData[a][0],
            bg.tbc.add(s, a).classId = a)
    },
    selectClass: function() {
        if (bg.tbc && bg.tbc.selected) {
            var t, e = bg.tbc.selected, s = (bg.char && (bg.char.del(),
            bg.charW.removeChild(bg.eq)),
            bg.sex ? bg.sex.selected.value : Plr.chars[bg.charId][3]);
            for (bg.char = new Char(bg.charW,{
                c: "ccChar",
                x: 10,
                y: 10,
                s: 240,
                id: 0,
                classId: e.classId,
                sex: s,
                weapon: -1,
                armor: -1
            }),
            bg.eq = CE("div", bg.charW, "ccUsable"),
            CTD(bg.eq, "Usable Weapons:", "ccUsableLabel"),
            t = 0; t < Items.itemData[0].length; t++)
                CStats.classData[e.classId][2][t] && cS(bg.eq, {
                    s: "svg/icon" + Items.icons[0][t] + ".svg",
                    c: "ccUsableItem",
                    w: 40,
                    h: 40
                });
            for (CTD(bg.eq, "Usable Armors:", "ccUsableLabel"),
            t = 0; t < Items.itemData[1].length; t++)
                CStats.classData[e.classId][3][t] && cS(bg.eq, {
                    s: "svg/icon" + Items.icons[1][t] + ".svg",
                    c: "ccUsableItem",
                    w: 40,
                    h: 40
                })
        }
    }
}, Con = {
    tog: function() {
        Con.E ? (stage.removeChild(Con.E),
        Con.E = null,
        stage.cw.classList.remove("ccOpen")) : (Con.E = CFI(stage, {
            c: "chatLogTB",
            ml: 400
        }),
        aE(Con.E, "keyup", Con.doKey),
        Con.E.focus(),
        stage.cw.classList.add("ccOpen"),
        Con.E.drop = function(t) {
            Con.set(Con.E.value + Items.getShortDesc(t.item))
        }
        )
    },
    open: function() {
        Con.E || Con.tog()
    },
    set: function(t) {
        Con.E.value = t,
        Con.E.focus()
    },
    doKey: function(t) {
        if (13 == t.keyCode) {
            var e = Con.E.value;
            if ("/" == e.charAt(0)) {
                var s = {
                    "/who": [1, 0],
                    "/reply": [2, 0],
                    "/r": [2, 0],
                    "/yell": [9, 0],
                    "/msg": [10, 1],
                    "/kill": [19, 1],
                    "/kick": [20, 2, Plr.getIdFromGroupName],
                    "/leader": [21, 2, Plr.getIdFromGroupName],
                    "/town": [22, 2, Plr.getIdFromGroupName],
                    "/shutdown": [29, 2],
                    "/online": [30, 3],
                    "/on": [30, 3],
                    "/dnd": [31, 3],
                    "/set": [33, 1],
                    "/debug": [38, 3],
                    "/mc": [39, 3]
                }
                  , a = e.split(" ", 2);
                if (a[0]in s)
                    switch (s[a[0]][1]) {
                    case 0:
                        njs.sendData([1, 11, 1, s[a[0]][0], 100, e.substr(a[0].length + 1, e.length)]);
                        break;
                    case 1:
                        2 == a.length && njs.sendData([1, 11, 1, s[a[0]][0], 100, a[1], 100, e.substr(a[0].length + a[1].length + 2, e.length)]);
                        break;
                    case 2:
                        njs.sendData([1, 11, 2, s[a[0]][0], 8, s[a[0]][2] ? s[a[0]][2](a[1]) : parseInt(a[1])]);
                        break;
                    case 3:
                        njs.sendBytes(11, s[a[0]][0])
                    }
                else
                    "/clear" == a[0] ? Log.m = [] : "/sound" == a[0] ? (a[1] || (a[1] = Plr.soundVol ? 0 : 10),
                    Sound.adjVol(a[1])) : "/whistle" == a[0] ? Cata.setWhistleLvl(a[1]) : "/find" == a[0] ? (a = e.split(" ", 3),
                    Grp.find(parseInt(a[1]), parseInt(a[2]))) : Log.add(39)
            } else
                0 < e.length && njs.sendData([1, 11, 1, 3, 100, e]);
            Con.tog()
        }
    }
}, Log = {
    m: [],
    T: ["All Logs", "Messages", "Group", "MQ"],
    get: function() {
        return pops.o[11]
    },
    tog: function() {
        var t = Log.get();
        if (t)
            return t.del();
        for ((t = new Popup(11,-1,-1,"")).tbc = new Radio(t.o,{
            c: "logTabs",
            oc: Log.clkTab
        }),
        t.tbc.tabs = new Array(Log.T.length),
        s = 0; s < Log.T.length; s++)
            t.tbc.tabs[s] = t.tbc.add(Log.T[s], s);
        t.spc = CE("DIV", t.o, "logBox");
        for (var e = "", s = t.th = 0; s < Log.m.length; s++)
            e += Log.m[s];
        t.spc.innerHTML = e,
        t.tbc.select(t.tbc.tabs[0]),
        dAC(stage.cw)
    },
    clkTab: function(t) {
        var e = Log.get();
        e && e.tab != t.value && (e.o.classList.remove("chTab" + e.tab),
        e.tab = t.value,
        e.o.classList.add("chTab" + e.tab),
        e.tbc.tabs[e.tab].classList.remove("pend"),
        e.spc.scrollTop = e.spc.scrollHeight)
    },
    open: function() {
        Log.get() || Log.tog(),
        Con.E || Con.tog()
    },
    add: function(t, e) {
        if (!e && (e = 0,
        !isNaN(t))) {
            switch (parseInt(t)) {
            case 23:
                Plr.dnd = 1;
                break;
            case 24:
                Plr.dnd = 0
            }
            t = SysMsgs[t]
        }
        t = "<dt>" + getTime() + "</dt> " + t,
        Log.addWin(t, e) || ((e = CE("div", stage.cw, "logText logL" + e)).innerHTML = t,
        e.alp = new njTween(e,"opacity",1.5,0,15,Log.rem))
    },
    addChat: function(t, e, s) {
        Log.add("<b>" + t + "</b>: " + e, s)
    },
    rem: function(t) {
        t.parentNode && t.parentNode.removeChild(t)
    },
    getTab: function(t) {
        return t ? 1 == t ? 2 : 2 == t || 3 == t ? 1 : 9 == t ? 3 : void 0 : 0
    },
    addWin: function(t, e) {
        Log.m.push('<div class="logL' + e + '">' + t + "</div>");
        var s = Log.get();
        return s ? (CE("div", s.spc, "logL" + e).innerHTML = t,
        s.tab && (t = Log.getTab(e)) != s.tab ? (s.tbc.tabs[t].classList.add("pend"),
        0) : (s.spc.scrollTop = s.spc.scrollHeight,
        1)) : 0
    },
    addMQ: function(t) {
        var e, s = 0, a = t[0] ? "hardcore" : "softcore", i = t[3] + " [*" + t[2] + "] " + (t[4] ? "(Guild: " + t[4] + ") " : "");
        if (t[1]) {
            for (e = 0; e < CStats.classData.length; e++)
                if (CStats.classData[e][1] == t[1]) {
                    s = e;
                    break
                }
            i += s ? "passed the " + a + " Master Quest and unlocked " + CStats.classData[s][0] + "." : "passed the " + a + " Master Quest as an Alchemist and has reset the ladder!"
        } else
            i += "failed the " + a + " Master Quest.";
        Log.add(i, 9)
    },
    addWho: function(t) {
        Log.add(t[5] + ", *" + t[4] + ", Level " + t[0] + " " + CStats.classData[t[1]][0] + ", Last Action " + t[3] + "s ago" + (t[6] ? ", Guild: " + t[6] : "") + (1 & t[2] ? ", (In Group)" : ""))
    }
}, Cbt = {
    start: function(t) {
        bg.maze || Maze.create(),
        dAC(bg.mapMask),
        Cata.clear(),
        Gs.hideControlButtons(),
        Plr.inCombat = 1,
        bg.mobA = CE("DIV", bg, "mobArea"),
        Cata.mobs = [],
        Cata.mobC = 0,
        Drops.purge()
    },
    addNewMob: function(t) {
        var e = t[0];
        Cata.mobs[e] = t,
        Cata.mobC++,
        Cata.mobs[e][9] = new Mob(bg.mobA,Cata.mobs[e])
    },
    remMob: function(t) {
        Cata.mobs[t] && Cbt.doRemMob(Cata.mobs[t])
    },
    doRemMob: function(t) {
        t[9].del(),
        delete Cata.mobs[t[0]],
        Plr.g && 0 == --Cata.mobC && (Plr.inCombat = 0,
        Gs.togEng(1))
    },
    doAttack: function(t, e, s, a, i, o) {
        var r, l, n, c;
        1 & t ? r = Cata.mobs[e][9] : (r = Plr.getChar(e),
        Plr.g && Plr.g.updateCombatStats(e, a, -1),
        1 & o && e == Plr.char && Prof.addPoints(32 <= i ? 2 : 0, 32 <= i ? i - 32 : i, 1)),
        2 & t ? l = Cata.mobs[s][9] : (l = Plr.getChar(s),
        Plr.g && Plr.g.updateCombatStats(s, -1, a)),
        n = a < 0 ? (c = "dmgTxtHeal",
        "+" + Math.abs(a)) : (c = (2 & o ? "dmgTxtCrit" : "") + (4 & o ? " lifeSteal" : "") + (8 & o ? " dmgReturn" : ""),
        a),
        l.addDmg(Gs.o, n, c, r == l ? 0 : r, 32 <= i ? "icon" + Items.icons[2][i - 32] : ""),
        16 & o && l.doParalyze(),
        s == Plr.char ? 0 <= a && 1 & t ? Sound.play(rnd(2, 3)) : a < 0 && !(1 & t) && Sound.play(1) : e == Plr.char && 2 & t && 0 <= a && Sound.play(rnd(4, 5))
    },
    clickAttack: function(t) {
        if (Plr.inCombat) {
            var e = Gs.atk[Gs.selAtk].item;
            if (e) {
                e = Items.isHealCharm(e);
                if (0 <= t)
                    e && (t = -Plr.char);
                else if (!e)
                    return
            }
            e = 0;
            -1 != Plr.abSelId && (e = Plr.abSelId),
            njs.sendData([1, (t < 0 ? 80 : 85) + Gs.selAtk, 1, e, 8, Math.abs(t)])
        }
    },
    updateEnemyStat: function(t, e, s) {
        switch (e) {
        case 22:
            t[9].setLife(s),
            t[4] <= 0 && Cbt.doRemMob(t);
            break;
        case 39:
            t[9].setPos(s);
            break;
        case 29:
            t[9].setEquip(0, s);
            break;
        case 30:
            t[9].setEquip(1, s);
            break;
        case 24:
            t[9].setSize(s);
            break;
        case 4:
            t[9].passiveStat(s)
        }
    },
    setEnemyStat: function(t, e, s) {
        t[Mob.statMap[e]] = s,
        Cbt.updateEnemyStat(t, e, s)
    },
    adjustEnemyStat: function(t, e, s) {
        t[Mob.statMap[e]] += s,
        Cbt.updateEnemyStat(t, e, s)
    },
    setNPCStats: function(t, e) {
        var s = t.getUint32(1, njs.LE);
        Plr.getStats(t, Cata.mobs[s], !e, e ? Cbt.setEnemyStat : Cbt.adjustEnemyStat)
    }
}, Drops = {
    get: function() {
        return pops.o[3]
    },
    tog: function() {
        var t = Drops.get();
        if (t)
            return t.del();
        Drops.open()
    },
    open: function() {
        var t = Drops.get();
        return t || (pops.w[3] || (pops.w[3] = -1),
        pops.h[3] || (pops.h[3] = -1),
        (t = new Popup(3,pops.w[3],pops.h[3],"Item Drops")).spc = CE("DIV", t.o, "dropItemsBox"),
        t.drag.style.left = t.drag.style.top = "1px",
        t.close.style.right = t.close.style.top = "1px",
        t.pTitle.style.opacity = .75,
        t.o.insertBefore(t.spc, t.drag),
        t.o.insertBefore(t.pTitle, t.spc),
        t.drawResize(Drops.rz),
        t.spX = 8,
        Drops.rz(t),
        t.minW = 72,
        t.minH = 50,
        Drops.drawAll(t)),
        t
    },
    rz: function(t) {
        t.pTitle.style.top = t.h / 2 - 7 + "px";
        var e = Math.floor((t.w - 20) / 44);
        e != t.spX && (t.spX = e)
    },
    drawAll: function(t) {
        for (var e in t.slots = [],
        Drops.I)
            Drops.draw(e)
    },
    draw: function(t) {
        var e = Drops.get();
        if (e.slots[Drops.I[t].slot] != t) {
            for (var s = 0; s in e.slots; )
                s++;
            e.slots[s] = t,
            e.spc.appendChild(Drops.I[t].o),
            Drops.I[t].slot = s
        }
    },
    add: function(t, e) {
        var s = {}
          , t = Items.add(s, t, e);
        Drops.open(),
        Drops.I[t] = new Item(null,s[t],0,0,{
            noDrag: !0,
            isDrop: !0,
            compareEQ: 1
        }),
        Drops.draw(t)
    },
    purge: function() {
        for (var t in Drops.I)
            Drops.I[t].startPurgeTimer(Drops.delItem)
    },
    clear: function() {
        var t = Drops.get();
        if (t) {
            for (var e in Drops.I)
                Drops.I[e].rc();
            t.slots = []
        }
        Drops.I = {}
    },
    delItem: function(t) {
        var e = Drops.get();
        e && Drops.I[t] && (Drops.I[t].rc(),
        delete e.slots[Drops.I[t].slot]),
        delete Drops.I[t]
    },
    doDelItem: function(t, e) {
        Drops.I[t] && (e ? e != Plr.char && (Log.add("<font color='#777777' size='-2'>" + Plr.g.members[e][13] + " got the " + Items.getName(Drops.I[t].item) + "</font>"),
        Drops.delItem(t)) : Drops.I[t].startLoot())
    },
    getItem: function(t, e) {
        Sound.item(),
        Drops.I[t] ? (Plr.items[e] = Drops.I[t].item,
        Plr.items[e][0] = e,
        Drops.delItem(t),
        Inv.addItem(e)) : njs.sendData([1, 6, 1, 0, 8, e])
    }
}, Fld = {
    L: {},
    e: {},
    A: function(t, e, s, a, i, o) {
        Fld.e[t] = [s, a, i, o, e],
        Fld.L[e] || (Fld.L[e] = 1),
        Fld.T || (Fld.T = setInterval(Fld.I, 100))
    },
    I: function() {
        var t, e = Object.keys(Fld.e)[0], s = Fld.e[e];
        Date.now() >= Fld.L[s[4]] + s[0] && ((t = s[1].get()) && (isNaN(s[3]) || t.tab == s[3]) && (s[1].clr && s[1].clr(t),
        njs.sendData(s[2]),
        Fld.L[s[4]] = Date.now() + 1e3),
        Fld.D(e),
        Object.keys(Fld.e).length || (Fld.T = clearInterval(Fld.T)))
    },
    D: function(t) {
        delete Fld.e[t]
    },
    G: function(t) {
        return Fld.e[t]
    }
}, Grp = {
    L: {},
    get: function() {
        return pops.o[6]
    },
    tog: function(t) {
        var e = Grp.get();
        if (e)
            return e.del();
        t && !isNaN(t) || (t = 0),
        Grp.inG() && (t = 2),
        Grp.setTab(t)
    },
    open: function(t) {
        var e, s = new Popup(6,-1,-1,""), a = (s.tbc = new Radio(s.o,{
            c: "gpTabs",
            oc: Grp.clkTab
        }),
        ["Group List", (Grp.inG() ? "Edit" : "Create") + " Group", "Find Players"]);
        for (s.tbc.tabs = new Array(a.length),
        e = 0; e < a.length; e++)
            s.tbc.tabs[e] = s.tbc.add(a[e], e);
        s.spc = CE("div", s.o, "gpListBox"),
        s.ctrls = CE("div", s.o, "gpControls"),
        s.tbc.select(s.tbc.tabs[t = t || 0])
    },
    inG: function() {
        return Plr.g && 2 & Plr.g.flags
    },
    clkTab: function(t) {
        var e = Grp.get();
        if (t.value != e.tab)
            switch (e.tab = t.value,
            dAC(e.spc),
            dAC(e.ctrls),
            t.value) {
            case 0:
                Grp.showList(e);
                break;
            case 1:
                Grp.showCreate(e);
                break;
            case 2:
                Grp.showFind(e)
            }
    },
    setTab: function(t) {
        var e = Grp.get();
        e ? e.tbc.select(e.tbc.tabs[t]) : Grp.open(t)
    },
    clear: function() {
        Grp.L = {};
        var t = Grp.get();
        t && (t.spc && t.spc.tbc && t.spc.tbc.clear(),
        t.groups = [],
        t.gL = {})
    },
    close: function() {
        var t = Grp.get();
        t && t.del()
    },
    leave: function() {
        2 == bg.bgT ? Log.add(47) : njs.sendBytes(60, 5)
    },
    find: function(t, e) {
        var s = Grp.get();
        s ? 2 != s.tab && Grp.setTab(2) : Grp.tog(2),
        Grp.clear(),
        (isNaN(t) || t < 1) && (t = 1),
        (isNaN(e) || e < t) && (e = t + 1),
        gcQS(s.spc, "ladLoad").innerHTML = "Loading...",
        Fld.A("P", "P", 1e4, Grp, [1, 11, 1, 64, 1, t, 1, e], 2)
    },
    join: function(t) {
        2 == bg.bgT ? Log.add(46) : njs.sendData([1, 60, 1, 2, 8, t])
    },
    canJoin: function(t) {
        var e = Plr.c[6]
          , s = Grp.L[t][0]
          , t = Grp.L[t][1];
        return 71 <= e && 71 <= s || e - t <= s && s <= e + t
    },
    init: function(t, e) {
        dAC(t.spc),
        t.spc.tbc = new Radio(t.spc,{
            c: "gpListTabs",
            dc: e
        }),
        t.groups = [],
        t.gL = {}
    },
    selGrp: function(t) {
        t = t.value;
        return 5 == Grp.L[t][2] ? Log.add('Error: The group you are attempting to join appears to be full. Refresh your group list without "All" checked if you believe this to be in error.') : Grp.canJoin(t) ? void Grp.join(t) : Log.add('Error: The group you are attempting to join appears to be out of your level range. Refresh your group list without "All" checked if you believe this to be in error.')
    },
    selPlr: function(t) {
        Con.open(),
        Con.set("/msg " + Grp.L[t.value] + " ")
    },
    refresh: function() {
        Grp.clear(),
        Grp.setTab(0);
        var t = Grp.get();
        if (Grp.inG())
            return gcQS(t.spc, "ladLoad").innerHTML = "Cannot search while in a group.";
        gcQS(t.spc, "ladLoad").innerHTML = "Loading...",
        Fld.A("G", "G", 1e3, Grp, [1, 60, 1, t && t.refreshAll.cb.checked ? 10 : 1], 0)
    },
    listDone: function(t) {
        var e, s = Grp.get();
        s && s.spc && (s.groups.length ? (e = qs(s.spc, ".ladLoad")) && TRC(e) : gcQS(s.spc, "ladLoad").innerHTML = "No " + (1 == t ? "groups available." : "players found."))
    },
    clkJoin: function() {
        var t = Grp.get();
        t.spc.tbc.selected && Grp.join(t.spc.tbc.selected.value)
    },
    showList: function(t) {
        CSB(t.ctrls, {
            s: "svg/iconRefresh.svg",
            c: "gpRefresh",
            w: 18,
            h: 18,
            tip: "Refresh Group List",
            cb: Grp.refresh
        }),
        t.refreshAll = CCBL(t.ctrls, {
            c: "gpRefreshAll",
            label: "All",
            id: "gRA"
        }),
        CAB({
            p: t.ctrls,
            c: "abutGradBl gpJoin",
            v: "Join Selected Group",
            oc: Grp.clkJoin
        }),
        Grp.init(t, Grp.selGrp),
        Grp.refresh()
    },
    showCreate: function(t) {
        var e = 0
          , s = 0
          , a = 5
          , i = 0
          , o = "";
        Grp.inG() && (s = 1,
        Plr.g.isLeader()) && (a = Plr.g.lvlRng,
        i = (e = 1) & Plr.g.flags,
        o = Plr.g.name),
        s && !e || (t.spc.innerHTML = `<div class="gpLabelWrap"><label class="gpLvlR">Group Name: <input type="text" id="gpName" maxlength="32" placeholder="Explore Climb" value="${o}"></label></div>
<div class="gpLabelWrap"><label class="gpLvlR">Level Join Range: <input type="text" id="gLJR" class="gpTxtLvlR" maxlength="3" value="${a}"></label></div>
<div class="gpAutoInvite${e ? " hide" : ""}"><label><input type="checkbox" id="gAIO" checked> Auto Invite Others</label></div>
<div class="gpGuildOnly"><label><input type="checkbox" id="gGO"${i ? " checked" : ""}> Guild Only</label></div>`,
        d = CAB({
            p: t.ctrls,
            c: "abutGradBl gpJoin",
            v: (e ? "Edit" : "Create") + " Group",
            oc: Grp.create
        }),
        e && (d.style.marginRight = "6px")),
        s && CAB({
            p: t.ctrls,
            c: "abutGradBl gpJoin",
            v: "Leave Group",
            oc: Grp.leave
        })
    },
    create: function() {
        var t = parseInt(gi("gLJR").value)
          , e = gi("gpName").value;
        (isNaN(t) || t < 3) && (t = 3),
        njs.sendData([1, 60, 1, 3, 1, 2 + (gi("gGO").checked ? 1 : 0) + (gi("gAIO").checked ? 4 : 0), 1, t, 100, e])
    },
    showFind: function(t) {
        Grp.clear();
        var e = CE("div", t.ctrls, "gpFindLevelWrap");
        return CTD(e, "Levels:", "gpLevels", null, "label"),
        t.lvlL = CFI(e, {
            c: "gpTxtLvlR",
            v: Plr.c[6] - 3 < 1 ? 1 : Plr.c[6] - 3,
            ml: 3
        }),
        t.lvlH = CFI(e, {
            c: "gpTxtLvlR",
            v: Plr.c[6] + 3,
            ml: 3
        }),
        t.findP = CAB({
            p: t.ctrls,
            c: "abutGradBl gpJoin",
            v: "Find Players",
            oc: Grp.clkFind
        }),
        Grp.init(t, Grp.selPlr)
    },
    clkFind: function(t) {
        var e = Grp.get();
        Grp.find(parseInt(e.lvlL.value), parseInt(e.lvlH.value))
    },
    addPlr: function(t, e, s, a, i) {
        Grp.setTab(2);
        var o, r = Grp.get();
        if (!Grp.L[t]) {
            for (Grp.L[t] = a,
            s = "Lvl " + s + " " + CStats.classData[e][0] + " " + a + (i ? " (" + i + ")" : ""),
            o = 0; r.groups[o]; )
                o++;
            r.groups[o] = r.spc.tbc.add(s, t),
            r.gL[t] = o
        }
    },
    addGrp: function(t) {
        Grp.setTab(0);
        var e, s = Grp.get(), a = t[0], i = Skill.get();
        if (i && i.started && i.bringToFront(),
        !Grp.L[a]) {
            for (Grp.L[a] = [t[5], t[2], t[3]],
            t[3],
            t[5],
            CStats.classData[t[4]][0],
            t[6],
            t[7] && t[7],
            e = 0; s.groups[e]; )
                e++;
            s.groups[e] = s.spc.tbc.add("", a),
            i = [{
                e: "label",
                txt: t[3] + "/5"
            }, {
                e: "label",
                txt: "Lv " + t[5]
            }, {
                e: "label",
                txt: CStats.classData[t[4]][0]
            }, {
                e: "label",
                txt: t[6]
            }, {
                e: "label",
                txt: t[7]
            }],
            mEa(s.groups[e], i),
            s.gL[a] = e
        }
    }
}, Gs = {
    load: function() {
        var t, e, s, a, i;
        for (clearBG(),
        Settings.loadChar(Plr.char),
        Gs.o && Gs.del(),
        Gs.o = CE("div", stage),
        Gs.o.id = "gs",
        Grp.clear(),
        Gs.glyphs = [],
        Gs.topbar = i = CE("div", stage, "topbar"),
        aE(e = CE("div", i, "tbObj tbMenu"), "mouseover", Gs.mS),
        aE(e, "mouseout", Gs.mH),
        mSVG(e, {
            n: svgs.menuV,
            c: "tbMenuIcon"
        }),
        Gs.topMenu = e = CE("div", e, "tbMenuItems tbMenuOptions hide"),
        aE(e, evt.MC, Gs.mH),
        a = [["iFist", "Proficiencies", Prof.tog], ["iStats", "Stats and Abilities", Stats.tog], ["iInv", "Inventory", Inv.tog], ["iChat", "Chat", Log.open], ["iVault", "Item Vault", Vlt.tog]],
        t = 0; t < a.length; t++)
            aE(s = CE("div", e, "tbMenuItem"), evt.MC, a[t][2]),
            mSVG(s, {
                n: svgs[a[t][0]],
                c: "cl" + a[t][0]
            }),
            CTD(s, a[t][1], "tbMenuLabel");
        for (cS(s = CE("div", e, "tbMenuItem"), {
            s: "svg/iconGold.svg"
        }),
        Gs.gold = CTD(s, 0, "tbMenuLabel"),
        Gs.setGold(),
        Gs.atk = new Array(3),
        t = 0; t < 3; t++)
            Gs.atk[t] = CE("div", CE("div", i, "tbObj"), "tbIcon atkBox"),
            Gs.atk[t].slot = t,
            Gs.atk[t].key = CTD(Gs.atk[t], "", "wpKey"),
            aE(Gs.atk[t], evt.MC, function(t) {
                Gs.setSelAtk(this.slot)
            });
        for (Gs.qs = CE("div", i, "tbObj tbItems"),
        Gs.drawQS(),
        s = CE("div", i, "tbObj tbMenu"),
        Gs.tbGlyph = e = CE("div", s, "twGlyphs hide"),
        cS(e, {
            s: "svg/iconGlyph.svg"
        }),
        Gs.tbGlyph.cnt = CTD(e, "", "mobGlC ds2"),
        Gs.tbGlyph.c = 0,
        Gs.glyphW = CE("div", s, "tbMenuItems tbMenuGlyphs"),
        Gs.abilities = CE("div", i, "botbar"),
        Gs.absc = new Array(3),
        s = CE("div", i, "tbObj tbLastObj"),
        Gs.doorObj = e = CTD(s, "Go to Town", "abutGradBl gradRed hide"),
        e.b1 = 70,
        e.b2 = 0,
        aE(e, evt.MC, function(t) {
            Plr.ctrlDoor && !t.ctrlKey && !t.metaKey || (Plr.target.set(),
            njs.sendBytes(this.b1, this.b2))
        }),
        Gs.updateAtkTypes(),
        Gs.selAtk = -1,
        Gs.setSelAtk(Plr.cd.sa),
        Gs.setStatsGlow(),
        Gs.cw = CE("div", Gs.o, "charWrap"),
        i = Plr.items[Plr.c[25]],
        a = Plr.items[Plr.c[26]],
        Gs.char = new Char(Gs.cw,{
            c: "charObj",
            s: 80,
            id: Plr.c[0],
            classId: Plr.c[5],
            sex: Plr.c[3],
            weapon: i ? i[5] : -1,
            armor: a ? a[5] : -1,
            name: Plr.c[2],
            level: Plr.c[6],
            hp: Plr.c[22],
            hpm: Plr.c[20],
            mp: Plr.c[23],
            mpm: Plr.c[21]
        }),
        Fld.L.S = Fld.L.G = Date.now(),
        Vlt.reset(),
        Plr.c[51] = Gs.char,
        Plr.updateExpBar(),
        t = 0; t < 3; t++)
            Plr.cd.ab[t] && !Plr.c[55][Plr.cd.ab[t]] && (Plr.cd.ab[t] = 0);
        Plr.startHealTimer(),
        Plr.target.start(),
        Plr.setBonusStats(-1, 1),
        Cata.whistleLvl = Cata.lastWhistle = 0,
        Town.show(),
        Log.add("Now in the Town Center. (Use C to open Stats, I to open Inventory, P to open Proficiencies, Q, E, R to set attack type)")
    },
    del: function() {
        if (Plr.c || Gs.o)
            for (i in Settings.saveChar(Plr.char),
            Plr.clear(),
            Drops.clear(),
            stage.removeChild(Gs.topbar),
            stage.removeChild(Gs.o),
            Gs)
                "function" != typeof Gs[i] && delete Gs[i]
    },
    setGold: function() {
        Gs.gold.t.nodeValue = Plr.gold.toFixed(2)
    },
    setSelAtk: function(t) {
        if (t = parseInt(t),
        Gs.selAtk != t) {
            if (t && !Gs.atk[t].icon)
                return Gs.setSelAtk(-1 != Gs.selAtk ? Gs.selAtk : 0);
            Gs.atk[Gs.selAtk] && Gs.atk[Gs.selAtk].classList.remove("sel"),
            Gs.selAtk = t,
            Gs.atk[Gs.selAtk].className += " sel",
            Plr.cd.sa = t,
            Stats.set()
        }
    },
    updateAtkType: function(t, e) {
        t != Gs.atk[e].item && (Gs.atk[e].icon && (Gs.atk[e].icon.del(),
        Gs.atk[e].icon = 0),
        Gs.atk[e].item = t) && (Gs.atk[e].icon = new Item(Gs.atk[e],t,0,0,{
            w: 20,
            noPrefix: !0,
            noDrag: !0
        }),
        Gs.atk[e].icon.slot = e,
        Gs.atk[e].insertBefore(Gs.atk[e].icon.o, Gs.atk[e].key))
    },
    updateAtkTypes: function() {
        Gs.updateAtkType(Plr.items[Plr.c[25]], 0),
        Gs.updateAtkType(Plr.items[Plr.c[27]], 1),
        Gs.updateAtkType(Plr.items[Plr.c[28]], 2)
    },
    drawQS: function() {
        var t, e = Gs.qs;
        for (dAC(e),
        Gs.qItems = {},
        Gs.qSlot = [],
        t = 0; t < Plr.qiSlots; t++)
            Gs.qSlot[t] = CE("DIV", e, "qSlotBox"),
            Gs.qSlot[t].slot = t,
            Gs.qSlot[t].itemId = 0,
            Gs.qSlot[t].mini = 1,
            evt.addDropEvt(Gs.qSlot[t], function(t) {
                Gs.setQISlot(this.slot, t.item)
            }),
            Gs.qSlot[t].key = CTD(Gs.qSlot[t], "", "qsKey"),
            Plr.cd.qb[t] && Plr.items[Plr.cd.qb[t]] && Gs.setQISlot(t, Plr.items[Plr.cd.qb[t]]);
        Gs.updateQuickKeys()
    },
    delQItem: function(t) {
        t in Gs.qItems && (Gs.qSlot[Gs.qItems[t]].removeChild(Gs.qSlot[Gs.qItems[t]].icon.o),
        Gs.qSlot[Gs.qItems[t]].icon = null,
        delete Gs.qItems[t])
    },
    setQISlot: function(t, e) {
        3 == e[4] && (Gs.delQItem(e[0]),
        Gs.qSlot[t].icon && Gs.delQItem(Gs.qSlot[t].icon.i),
        Gs.qSlot[t].icon = new Item(Gs.qSlot[t],e,0,0,{
            w: 20,
            noPrefix: !0,
            ctrlUse: !0
        }),
        Gs.qSlot[t].insertBefore(Gs.qSlot[t].icon.o, Gs.qSlot[t].key),
        Gs.qItems[e[0]] = t)
    },
    useQISlot: function(t) {
        Plr.c && (t = Gs.qSlot[t]) && t.icon && t.icon.useItem(null)
    },
    updateQuickKeys: function() {
        for (var t = 0; t < 3; t++)
            Gs.atk[t].key.t.nodeValue = Settings.getKB(Plr.keycodes[12 + t], Plr.keymap[12 + t]);
        for (t = 0; t < Plr.qiSlots; t++)
            Gs.qSlot[t].key.t.nodeValue = Settings.getKB(Plr.keycodes[26 + t], Plr.keymap[26 + t])
    },
    gAbById: function(t) {
        for (var e = 0; e < 3; e++)
            if (!Gs.absc[e] || Gs.absc[e].id == t)
                return e;
        return -1
    },
    upAbChIcon: function(t, e) {
        var s, a;
        if (0 == t) {
            for (s = 0; s < 3; s++)
                Gs.absc[s] && (Gs.absc[s].del(),
                Gs.absc[s] = null);
            Plr.abSelId = -1
        } else if (s = Gs.gAbById(t),
        0 == e) {
            if (Plr.abSelId == t && (Plr.abSelId = -1),
            Gs.absc[s]) {
                for (Gs.absc[s].del(),
                a = s; a < 2; a++)
                    Gs.absc[a] = Gs.absc[a + 1];
                Gs.absc[a] = null
            }
        } else
            Gs.absc[s] ? Gs.absc[s].setCharge(e) : (Plr.abSelId == t && (Plr.abSelId = -1),
            Gs.absc[s] = new AC(Gs.abilities,t,e))
    },
    setAbilityCharge: function(t) {
        for (var e, s, a = 2; a < t.byteLength; )
            e = t.getUint8(a++),
            s = t.getUint8(a++),
            Gs.upAbChIcon(e, s)
    },
    abSel: function(t) {
        var e, s = 0;
        -1 != Plr.abSelId && (e = Gs.gAbById(Plr.abSelId),
        t == Plr.abSelId && (s = 1),
        Plr.abSelId = -1,
        Gs.absc[e].unselect(),
        s) || (e = Gs.gAbById(t),
        Gs.absc[e] && (Plr.abSelId = t,
        Gs.absc[e].select()))
    },
    addDoor: function() {
        Gs.doorObj.classList.remove("hide"),
        Gs.door = 1
    },
    remDoor: function() {
        Gs.door && Gs.doorObj.classList.add("hide"),
        Gs.door = 0
    },
    hideControlButtons: function() {
        Gs.engage && (Gs.engage.style.display = Gs.arrows.style.display = "none")
    },
    addEng: function() {
        var t;
        Gs.engage || (Gs.engage = CSB(Gs.o, {
            s: "svg/iconEngage.svg",
            c: "cataEngage",
            w: 18,
            h: 18,
            cb: Cata.engage,
            tip: "Engage"
        }),
        (t = Gs.arrows = CE("div", Gs.o, "cataArrowControls")).L = mSVG(t, {
            n: svgs.arrowL,
            cb: function(t) {
                Maze.move(0)
            }
        }),
        t.U = mSVG(t, {
            n: svgs.arrowU,
            cb: function(t) {
                Maze.move(1)
            }
        }),
        t.R = mSVG(t, {
            n: svgs.arrowR,
            cb: function(t) {
                Maze.move(2)
            }
        }),
        t.D = mSVG(t, {
            n: svgs.arrowD,
            cb: function(t) {
                Maze.move(3)
            }
        }),
        t.W = mSVG(t, {
            n: svgs.whistle,
            cb: Cata.whistle
        }))
    },
    remEng: function() {
        Gs.engage && (Gs.o.removeChild(Gs.engage),
        Gs.engage = null),
        Gs.arrows && (Gs.o.removeChild(Gs.arrows),
        Gs.arrows = null)
    },
    togEng: function(t) {
        Gs.engage && (Gs.engage.style.display = t ? "block" : "none",
        Gs.arrows.style.display = t || Plr.hideArrows ? "none" : "block")
    },
    setStatsGlow: function() {
        var t;
        if (Plr.c[7] || Plr.c[8]) {
            if (Gs.statsGlow)
                return;
            Gs.statsGlow = 1,
            t = "#FF8888"
        } else {
            if (!Gs.statsGlow)
                return;
            Gs.statsGlow = 0,
            t = "#FFFFFF"
        }
        document.querySelector(".tbMenuIcon path").setAttributeNS(null, "stroke", t),
        document.querySelector(".cliStats path").setAttributeNS(null, "stroke", t)
    },
    addGlyph: function(t) {
        for (var t = Plr.glyphs[t], e = (t[3] += Math.floor(Date.now() / 1e3),
        Gs.tbGlyph.cnt.t.nodeValue = ++Gs.tbGlyph.c,
        1 == Gs.tbGlyph.c && Gs.tbGlyph.classList.remove("hide"),
        0); Gs.glyphs[e]; )
            e++;
        Gs.glyphs[e] = new Item(Gs.glyphW,t,0,0,{
            w: 20,
            noPrefix: !0,
            noDrag: !0,
            glyph: !0
        }),
        Gs.glyphs[e].o.className = "",
        Plr.setBonusStats(t, 1),
        t[1] && t[1] != Plr.char && Log.add(Plr.g.members[t[1]][13] + " used a " + Items.getName(t) + " on you.")
    },
    removeGlyph: function(t) {
        for (var e in Plr.setBonusStats(Plr.glyphs[t], 0),
        Gs.glyphs)
            if (Gs.glyphs[e].i == t)
                break;
        Gs.glyphs[e].del(),
        delete Gs.glyphs[e],
        delete Plr.glyphs[t],
        Gs.tbGlyph.cnt.t.nodeValue = --Gs.tbGlyph.c,
        Gs.tbGlyph.c || Gs.tbGlyph.classList.add("hide")
    },
    mS: function() {
        Gs.topMenu.classList.remove("hide")
    },
    mH: function() {
        Gs.topMenu.classList.add("hide")
    }
}, Inv = {
    get: function() {
        return pops.o[2]
    },
    open: function() {
        var t = Inv.get();
        if (t)
            return t.bringToFront();
        Inv.tog()
    },
    setTab: function(t) {
        Inv.open();
        var e = Inv.get();
        e.tbc.select(e.tbc.tabs[t])
    },
    clear: function() {
        var t, e = Inv.get();
        if (e) {
            for (t in e.eqp)
                e.spc.removeChild(e.eqp[t].o);
            for (t in e.items)
                e.itmB.removeChild(e.items[t].o);
            Inv.redraw(e)
        }
    },
    tog: function() {
        var t, e, s = Inv.get();
        if (s)
            return s.del();
        Gs.abilities.classList.add("mHide"),
        (s = new Popup(2,-1,-1,"")).cbClose = function(t) {
            Gs && Gs.abilities && Gs.abilities.classList.remove("mHide")
        }
        ,
        s.tbc = new Radio(s.o,{
            c: "invTabs",
            oc: Inv.clkTab
        });
        var a = ["Inventory", "Equipment", "Items"];
        for (s.tbc.tabs = new Array(a.length),
        t = 0; t < a.length; t++)
            s.tbc.tabs[t] = s.tbc.add(a[t], t);
        s.tbc.select(s.tbc.tabs[0]),
        s.ieq = CE("div", s.o, "invEquipped");
        var i = [["Weapon", 25], ["Armor", 26], ["Charm", 27], ["Acc. Charm", 28]];
        for (s.eq = [],
        t = 0; t < i.length; t++)
            CTD(e = CE("div", s.ieq, "invEqWrap"), i[t][0], "invEqLabel"),
            s.eq[t] = new ItemSlot(e,{
                noDropSet: 1,
                drop: Inv.drpEqp
            }),
            s.eq[t].i = t,
            Plr.c[i[t][1]] && Plr.items[Plr.c[i[t][1]]] && s.eq[t].set(Plr.items[Plr.c[i[t][1]]]);
        s.eql = mFL(s.o, {
            t: "Equipment ( 0 / 0 )",
            c: "invEqCountLabel"
        }),
        e = CSB(null, {
            s: "svg/iconSort.svg",
            c: "sortIcon",
            w: 12,
            h: 12,
            cb: Inv.sortEq,
            tip: "Sort Equipment By Type"
        }),
        s.eql.l.insertBefore(e, s.eql.l.firstChild),
        s.spc = CE("DIV", s.o, "invEqBox"),
        s.itmW = CE("div", s.o, "invItemsWrap"),
        s.itmL = mFL(s.itmW, {
            t: "Items",
            c: "invItemsLabel"
        }),
        e = CSB(null, {
            s: "svg/iconSort.svg",
            c: "sortIcon",
            w: 12,
            h: 12,
            cb: Inv.sortItems,
            tip: "Sort Items By Type"
        }),
        s.itmL.l.insertBefore(e, s.itmL.l.firstChild),
        s.aU = CE("div", CE("div", s.itmW, "invIWSide"), "itemSlotBox"),
        mSVG(s.aU, {
            n: svgs.use,
            c: "tbIcon"
        }),
        evt.addDropEvt(s.aU, function(t) {
            t.useItem(null)
        }),
        s.itmB = CE("DIV", s.itmW, "invItemsBox"),
        s.aT = CE("div", CE("div", s.itmW, "invIWSide"), "itemSlotBox"),
        mSVG(s.aT, {
            n: svgs.trash,
            c: "tbIcon"
        }),
        evt.addDropEvt(s.aT, function(t) {
            njs.sendData([1, 20, 1, 2, 8, t.i])
        }),
        Inv.showActs(s, 0),
        Inv.redraw(s),
        Inv.setEqSlots()
    },
    showActs: function(t, e) {
        t.aU.style.display = 2 & e ? "block" : "none",
        t.aT.style.display = 4 & e ? "block" : "none"
    },
    clkTab: function(t) {
        var e = Inv.get();
        switch (e.o.classList.remove("invEqSlots"),
        e.o.classList.remove("invItems"),
        t.value) {
        case 0:
            break;
        case 1:
            e.o.classList.add("invEqSlots");
            break;
        case 2:
            e.o.classList.add("invItems")
        }
    },
    drpEqp: function(t, e) {
        var s = t.i < 3 ? t.i : 2;
        e.i != Plr.c[25 + e] && e.item[4] == s && njs.sendData([1, 20, 1, t.i < 3 ? 3 : 4, 8, e.i])
    },
    redraw: function(t) {
        for (t.eqp = [],
        t.items = [],
        t.itemsL = [],
        s = t.eqc = 0; s < 16; s++)
            t.items[s] = new ItemSlot(t.itmB,{
                noDropSet: 1,
                params: {
                    w: 20,
                    noPrefix: !0,
                    ctrlUse: !0,
                    shiftClick: !0
                },
                drop: Inv.drpItm
            }),
            t.items[s].i = s,
            Plr.cd.ii[s] && Inv.addItem(Plr.cd.ii[s], s);
        for (s = 0; s < Plr.c[24]; s++)
            Inv.newEq(t, s),
            Plr.cd.ie[s] && Inv.addItem(Plr.cd.ie[s], s);
        var e = [];
        for (var s in Plr.items)
            s in t.itemsL || (Plr.items[s][4] < 3 ? Items.isEquipped(s) || e.push(s) : Inv.addItem(s));
        for (s = 0; s < e.length; s++)
            Inv.addItem(e[s])
    },
    doDrop: function(t, e, s) {
        var a, i = e.i, o = Inv.get(), r = Vlt.get();
        if (i in o.itemsL) {
            if (0 == s) {
                if (Plr.cd.ie[t.i] == i || 3 <= e.item[4])
                    return;
                a = Plr.cd.ie[t.i]
            } else {
                if (Plr.cd.ii[t.i] == i || 3 != e.item[4] && 4 != e.item[4])
                    return;
                if (a = Plr.cd.ii[t.i],
                t && t.icon && t.icon.item && Items.canStack(e.item, t.icon.item))
                    return Items.stackItem(a, i)
            }
            1 && (a && Inv.remItem(a),
            e = o.itemsL[i],
            Inv.remItem(i),
            a && Inv.addItem(a, e),
            Inv.addItem(i, t.i))
        } else
            0 == s && Plr.c[28] == i ? njs.sendData([1, 20, 1, 5, 8, i]) : Mkt.I && Mkt.I[i] && Mkt.I[i][1] == njs.uid ? njs.sendData([1, 30, 1, 2, 8, i]) : r && r.items[i] && njs.sendData([1, 25, 1, 4, 8, i])
    },
    drpItm: function(t, e) {
        Inv.doDrop(t, e, 1)
    },
    newEq: function(t, e) {
        t.eqp[e] = new ItemSlot(t.spc,{
            noDropSet: 1,
            params: {
                shiftClick: !0,
                compareEQ: 1,
                ctrlCustom: "eqp",
                ccB1: 20,
                ccB2: 3
            },
            drop: Inv.drpEqSlt
        }),
        t.eqp[e].i = e
    },
    drpEqSlt: function(t, e) {
        Inv.doDrop(t, e, 0)
    },
    sort: function(t, e) {
        t = Plr.items[t],
        e = Plr.items[e];
        return t[4] == e[4] ? t[5] == e[5] ? t[6] == e[6] ? t[7] - e[7] : t[6] - e[6] : t[5] - e[5] : t[4] - e[4]
    },
    sortEq: function(t) {
        var e, s = [], a = Inv.get();
        for (e in a.eqp)
            a.eqp[e].icon && s.push(a.eqp[e].icon.i);
        for (s = s.sort(Inv.sort),
        Plr.cd.ie = [],
        e = 0; e < s.length; e++)
            Plr.cd.ie[e] = s[e];
        Inv.clear(a)
    },
    sortItems: function(t) {
        var e, s = [], a = Inv.get();
        for (e in a.items)
            a.items[e].icon && s.push(a.items[e].icon.i);
        for (s = s.sort(Inv.sort),
        Plr.cd.ii = [],
        e = 0; e < s.length; e++)
            Plr.cd.ii[e] = s[e];
        Inv.clear(a)
    },
    setEqSlots: function() {
        var t = Inv.get();
        t && (t.eql.l.t.nodeValue = "Equipment ( " + t.eqc + " / " + Plr.c[24] + " )")
    },
    addItem: function(t, e) {
        var s = Inv.get();
        if (s) {
            var a = Plr.items[t];
            if (a)
                if (e = e || 0,
                3 <= a[4]) {
                    if (!(t in s.itemsL)) {
                        for (; s.items[e] && s.items[e].icon; )
                            e++;
                        16 <= e || (s.itemsL[t] = e,
                        s.items[e].set(a),
                        Plr.cd.ii[e] = t)
                    }
                } else {
                    for (; s.eqp[e] && s.eqp[e].icon; )
                        e++;
                    t in s.itemsL || Items.isEquipped(t) ? Plr.cd.ie[e] = 0 : (s.eqp[e] || Inv.newEq(s, e),
                    s.itemsL[t] = e,
                    s.eqp[e].set(a),
                    Plr.cd.ie[e] = t,
                    s.eqc++,
                    Inv.setEqSlots())
                }
        }
    },
    remItem: function(t) {
        var e, s, a = Inv.get();
        a && t in a.itemsL && (e = Plr.items[t],
        s = a.itemsL[t],
        e[4] < 3 ? a.eqp[s] && (a.eqp[s].clear(),
        a.eqc--,
        delete a.itemsL[t],
        delete Plr.cd.ie[s],
        Inv.setEqSlots()) : (a.items[s].clear(),
        delete a.itemsL[t],
        delete Plr.cd.ii[s]))
    },
    delItem: function(t) {
        Plr.items[t] && (Inv.remItem(t),
        Gs.delQItem(t),
        Mkt.delItem(t),
        Vlt.clearItem(t),
        Shrine.clrItem(t),
        delete Plr.items[t])
    },
    sel: function(t) {
        var e = Inv.get();
        if (e) {
            if (t) {
                var s = t.i;
                if (!Plr.items[s] || Items.isEquipped(s))
                    return
            }
            Inv.showActs(e, t ? t.item[4] < 3 ? 5 : 6 : 0)
        }
    }
}, Ladder = {
    get: function() {
        return pops.o[7]
    },
    tog: function() {
        var t = Ladder.get();
        if (t)
            return t.del();
        for ((t = new Popup(7,-1,-1,"")).cats = new Radio(t.o,{
            c: "ladderTabs",
            oc: Ladder.setCat
        }),
        t.cats.cats = [],
        labs = ["Experience", "Weapons", "Charms", "Skills"],
        a = 0; a < labs.length; a++)
            t.cats.cats[a] = t.cats.add(labs[a], a);
        t.subcat = new Radio(t.o,{
            c: "ladderSubCatTabs",
            oc: Ladder.clk
        }),
        t.subcat.cats = [],
        t.spc = CE("div", t.o, "ladderDetailsBox"),
        t.spc.tbl = CE("table", t.spc, "ladderTable"),
        t.spc.tbl.thead = CE("thead", t.spc.tbl, "");
        for (var e = CE("tr", t.spc.tbl.thead, ""), s = ["#", "Character Name", "Experience", "Class", "Lvl", "Guild"], a = 0; a < s.length; a++)
            CT(s[a], CE("th", e, ""));
        t.spc.tbl.tbody = CE("tbody", t.spc.tbl, ""),
        t.L = CE("div", t.spc, "ladLoad"),
        t.L.innerHTML = "Loading...",
        t.cats.select(t.cats.cats[0])
    },
    clk: function(t) {
        var e = Ladder.get();
        Ladder.clr(e),
        e.lName = t.t.nodeValue,
        Fld.A("L", "L", 3e3, Ladder, [1, 8, 1, e.cats.selected.value, 1, t.value]),
        e.L.style.display = "block"
    },
    clr: function(t) {
        dAC(t.spc.tbl.tbody),
        t.cnt = 0
    },
    setCat: function(t) {
        var e = Ladder.get()
          , s = e.subcat;
        for (i = 0; i < s.cats.length; i++)
            s.del(s.cats[i]);
        switch (s.cats = [],
        Ladder.clr(e),
        t.value) {
        case 0:
            for (s.cats[0] = s.add("All Classes", 0),
            i = 0; i < CStats.classData.length; i++)
                s.cats[i + 1] = s.add(CStats.classData[i][0], i + 1, 0);
            break;
        case 1:
        case 2:
            for (var a = 1 == t.value ? 0 : 2, i = 0; i < Items.itemData[a].length; i++)
                s.cats[i] = s.add(up1stChar(Items.itemData[a][i][0]), i);
            break;
        case 3:
            for (i = 0; i < Prof.skillNames.length; i++)
                s.cats[i] = s.add(up1stChar(Prof.skillNames[i]), i)
        }
        s.select(s.cats[0])
    },
    setRank: function(t, e) {
        var s = Plr.c[4] && parseInt(e[6]) ? "rowDead" : "";
        s += " " + (e[1] == Plr.c[2] ? "rowMe" : "");
        for (var a = CE("tr", t.tbl.tbody, s), i = 0; i < 6; i++)
            CE("td", a, "").innerHTML = e[i]
    },
    fin: function() {
        var t = Ladder.get();
        t && (t.L.style.display = "none")
    },
    expRank: function(t) {
        var e = Ladder.get();
        e && Ladder.setRank(e.spc, [++e.cnt, t[5], t[1], -1 == t[2] ? "None" : CStats.classData[t[2]][0], t[0], t[6], t[4], t[3]])
    },
    profRank: function(t) {
        var e = Ladder.get();
        e && Ladder.setRank(e.spc, [++e.cnt, t[2], t[0] - (t[0] >> 24 << 24), e.lName, t[0] >> 24, t[3], 0, t[1]])
    }
}, Login = {
    draw: function() {
        Gs.del(),
        Plr.clear(),
        Popup.closeAll(),
        clearBG();
        var t = CE("div", bg, "logoWrap");
        cS(t, {
            s: "svg/loginLogo.svg",
            w: 346.6,
            h: 162.3,
            d: {
                width: "100%"
            }
        }),
        CTD(t, "Ladder Slasher", "logoLabel"),
        CTD(t, String.fromCharCode(169) + " 2008-" + (new Date).getFullYear() + " by Paul Taulborg (njaguar)", "logoCR"),
        bg.login = CAB({
            p: CE("div", t, "lbWrap"),
            c: "abutGradBl lButton",
            v: "Login as " + njs.uname,
            oc: Login.click
        }),
        aE(bg.login, "touchstart", function(t) {
            evt.setMobile(),
            Login.click()
        }),
        CTD(bg, "v1." + (_VERSION < 10 ? "0" : "") + _VERSION + _VERSION_M, "lsVersion")
    },
    click: function() {
        bg.login.value = "Logging in...",
        bg.login.disabled = !0,
        njs.connect()
    }
}, _VERSION = 33, _VERSION_M = ".1", dragO = 0, evt = {
    MD: "mousedown",
    MU: "mouseup",
    MC: "click",
    selItem: 0,
    setMobile: function() {
        this.MD = "touchstart",
        this.MU = "touchend",
        Plr.isM = 1
    },
    getCX: function(t) {
        return Plr.isM && t.changedTouches ? t.changedTouches[0].pageX : t.clientX
    },
    getCY: function(t) {
        return Plr.isM && t.changedTouches ? t.changedTouches[0].pageY : t.clientY
    },
    setSelItem: function(t) {
        evt.selItem && evt.unsetSelItem(),
        (evt.selItem = t).sel(),
        Inv.sel(t)
    },
    unsetSelItem: function(t) {
        !evt.selItem || t && t != evt.selItem || (document.body.contains(evt.selItem.o) && evt.selItem.unsel(),
        evt.selItem = 0,
        Inv.sel(0))
    },
    addDropEvt: function(t, e) {
        t.drop = e,
        Plr.isM && aE(t, "touchstart", function(t) {
            evt.selItem && this.drop && this.drop(evt.selItem, t)
        })
    },
    initDD: function() {
        Plr.isM && !evt.IM && (evt.IM = 1,
        aE(document, "touchmove", function(t) {
            var e;
            dragO && (e = dragO.prop || "o",
            dragO[e].style.left = t.changedTouches[0].pageX - dragO.ow + "px",
            dragO[e].style.top = t.changedTouches[0].pageY - dragO.oh + "px")
        }),
        aE(document, "touchend", function(t) {
            dragO && (dragO.cbUp && dragO.cbUp(document.elementFromPoint(t.changedTouches[0].clientX, t.changedTouches[0].clientY), dragO),
            dragO = null)
        }))
    }
};
function dResize() {
    sizeX = window.innerWidth,
    sizeY = window.innerHeight,
    stage.style.height = sizeY + "px"
}
function mld() {
    if (stage = gi("stage"),
    "undefined" == typeof DataView)
        return stage.style.background = "#7fa7d8",
        CTD(stage, "Your browser is not compatible with Ladder Slasher. Please choose a different and/or more recent version.", "logoLabel");
    aE(document, "mousemove", function(t) {
        var e, s, a, i, o;
        dragO && (e = dragO.prop || "o",
        s = t.clientX - dragO.ow,
        a = t.clientY - dragO.oh,
        i = sizeX - dragO[e].offsetWidth,
        o = sizeY - dragO[e].offsetHeight,
        dragO[e].style.left = (0 <= s ? s <= i ? s : i : 0) + "px",
        dragO[e].style.top = (34 <= a ? a <= o ? a : o : 34) + "px",
        dragO.cbMove) && dragO.cbMove(t.target, dragO)
    }),
    aE(document, "mouseup", function(t) {
        dragO && (dragO.cbUp && dragO.cbUp(t.target, dragO),
        dragO = null)
    }),
    aE(window, "resize", dResize),
    dResize(),
    stage.cw = CE("div", stage, "chatWrap"),
    njs = new njSock,
    aE(document, "keydown", doKeyDown),
    aE(document, "keyup", doKeyUp),
    Settings.load()
}
function getTime() {
    var t = new Date
      , e = t.getHours()
      , t = t.getMinutes();
    return (e < 10 ? "0" : "") + e + ":" + (t < 10 ? "0" : "") + t
}
function clearBG(t) {
    switch (t = t || 0,
    stage.style.removeProperty("background"),
    t) {
    case 0:
        stage.className = "bgGrass" + (Plr.dark ? " darkMode" : "");
        break;
    case 1:
        stage.className = "bgLake";
        break;
    case 2:
        stage.className = "bgCata";
        break;
    case 3:
        stage.className = "bgMQ";
        break;
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
        stage.className = "",
        stage.style.background = "linear-gradient(to bottom, " + Plr.g.zoneSkyCSS + " 0%," + Plr.g.zoneSkyHCSS + " 72px, " + Plr.g.zoneFloorHCSS + " 72px," + Plr.g.zoneWallCSS + " 100%)"
    }
    bg && stage.removeChild(bg),
    (bg = CE("div", stage)).id = "bg",
    bg.bgT = t
}
function tfHasF(t) {
    return t.target && "input" == t.target.tagName.toLowerCase() && t.target.type.toLowerCase()in {
        text: 1,
        password: 1,
        number: 1
    }
}
function doKeyDown(t) {
    var e;
    "r" === t.key && t.ctrlKey && t.preventDefault(),
    tfHasF(t) || 35 <= (e = Plr.keymap.indexOf(t.keyCode)) && e <= 37 && (t.abObj ? t.abObj.setKeySlot(e - 35) : Plr.g && Plr.cd.ab[e - 35] && Gs.abSel(Plr.cd.ab[e - 35]))
}
function doKeyUp(t) {
    if (!tfHasF(t)) {
        var e = Plr.g && Plr.g.isLeader() && Gs.door
          , s = Plr.keymap.indexOf(t.keyCode);
        if (-1 != Plr.char)
            switch (s) {
            case 0:
                Con.tog(t);
                break;
            case 1:
                Settings.tog();
                break;
            case 2:
                Stats.tog();
                break;
            case 3:
                Grp.tog();
                break;
            case 4:
                Inv.tog();
                break;
            case 5:
                Log.tog();
                break;
            case 6:
                Drops.tog();
                break;
            case 7:
                Prof.tog();
                break;
            case 8:
                Vlt.tog();
                break;
            case 9:
                Mkt.tog();
                break;
            case 10:
                Shrine.tog();
                break;
            case 11:
                Popup.closeAll();
                break;
            case 12:
                Gs.setSelAtk(0);
                break;
            case 13:
                Gs.setSelAtk(1);
                break;
            case 14:
                Gs.setSelAtk(2);
                break;
            case 15:
                e && Cata.engage(null);
                break;
            case 16:
                e && Maze.move(5);
                break;
            case 17:
                e && Cata.whistle();
                break;
            case 18:
            case 19:
            case 20:
            case 21:
                e && Maze.move(s - 18);
                break;
            case 22:
            case 23:
            case 24:
            case 25:
                e && Maze.move(s - 22);
                break;
            case 26:
            case 27:
            case 28:
            case 29:
            case 30:
            case 31:
            case 32:
            case 33:
            case 34:
                Gs.useQISlot(s - 26)
            }
        return -1 != s || 18 == t.keyCode ? eSP(t) : void 0
    }
}
function rnd(t, e) {
    return Math.floor(Math.random() * (e - t + 1)) + t
}
function up1stChar(t) {
    return t.substring(1, 0).toUpperCase() + t.substring(1)
}
function dAC(t) {
    for (; t.childNodes.length; )
        t.removeChild(t.childNodes[0])
}
function gi(t) {
    return document.getElementById(t)
}
function aE(t, e, s, a) {
    t.addEventListener(e, s, !!a)
}
function qs(t, e) {
    return t.querySelector(e)
}
function gcQS(t, e) {
    return qs(t, "." + e) || CE("div", t, e)
}
function mEa(t, e) {
    for (var s, a, i, o, r = 0; r < e.length; r++) {
        if ((i = e[r]).e ? ((a = document.createElement(i.e)).title = "",
        i.t && (a.type = i.t),
        t.appendChild(a)) : a = t,
        i.cl && (a.className = i.cl),
        null != i.txt && "" != i.txt && (a.t = CT(i.txt, a)),
        i.id && (a.id = i.id),
        null != i.v && (a.value = i.v),
        i.ml && (a.maxLength = i.ml),
        i.lFor && (a.htmlFor = i.lFor),
        null != i.chk && (a.checked = i.chk),
        null != i.min && (a.min = i.min),
        null != i.max && (a.max = i.max),
        i.ph && (a.placeholder = i.ph),
        i.s && (a.src = i.s),
        i.D && (a.disabled = !0),
        i.po) {
            for (o = t; i.poup && 0 < i.poup--; )
                o = o.parentNode;
            null != i.poi ? (o[i.po] || (o[i.po] = new Array(i.poim)),
            o[i.po][i.poi] = a) : o[i.po] = a
        }
        if (i.sbfe && sbAdd(a, "", -1),
        i.sd)
            for (s = 0; s < i.sd.length; s++)
                sbAdd(a, i.sd[s], s);
        if (i.ev)
            for (s = 0; s < i.ev.length; s += 2)
                aE(a, i.ev[s], i.ev[s + 1]);
        i.c && mEa(a, i.c)
    }
}
function CE(t, e, s, a) {
    var i = document.createElement(t);
    if (i.title = "",
    e && e.appendChild(i),
    s && (i.className = s),
    a)
        for (var o in a)
            i.style[o] = a[o];
    return i
}
function CT(t, e) {
    t = document.createTextNode(t);
    return e && e.appendChild(t),
    t
}
function CTD(t, e, s, a, i) {
    var o = CE(i || "div", t);
    if (s && (o.className = s),
    a)
        for (var r in a)
            o.style[r] = a[r];
    if ("object" != typeof e)
        o.t = CT(e, o);
    else {
        o.t = [];
        for (r = 0; r < e.length; r++)
            o.t[r] = CT(e[r], o),
            CE("br", o)
    }
    return o
}
function mFL(t, e) {
    var s = CE("fieldset", t);
    if (s.className = "fsLegend" + (e.c ? " " + e.c : ""),
    e.d)
        for (var a in e.d)
            s.style[a] = e.d[a];
    return e.t && (s.l = CE("legend", s),
    s.l.t = CT(e.t, s.l)),
    s
}
function CI(t, e, s, a, i, o, r) {
    t = CE("IMG", t);
    return t.src = e,
    t.className = "pa" + (r ? " " + r : ""),
    t.style.left = s + "px",
    t.style.top = a + "px",
    i && (t.width = i),
    o && (t.height = o),
    t
}
function cS(t, e) {
    var s = CE("IMG", t);
    if (s.src = e.s,
    e.c && (s.className = e.c),
    e.w && (s.width = e.w),
    e.h && (s.height = e.h),
    e.d)
        for (var a in e.d)
            s.style[a] = e.d[a];
    return s
}
function CSB(t, e) {
    e.c += " cp";
    t = cS(t, e);
    return e.cb && aE(t, evt.MC, e.cb),
    e.tip && (e = {
        text: e.tip,
        tipY: e.tipY
    },
    t.tip = new Tip(t,{},e)),
    t
}
function CFI(t, e) {
    var s = CE("input");
    if (s.type = e.t || "text",
    e.c && (s.className = e.c),
    e.d)
        for (var a in e.d)
            s.style[a] = e.d[a];
    return e.v && (s.value = e.v),
    e.ml && (s.maxLength = e.ml),
    e.oc && aE(s, evt.MC, e.oc),
    t.appendChild(s),
    s
}
function CAB(t) {
    var e = CE("A", t.p);
    if (t.c && (e.className = t.c),
    t.d)
        for (var s in t.d)
            e.style[s] = t.d[s];
    return t.v && CT(t.v, e),
    t.oc && aE(e, evt.MC, t.oc),
    e
}
function CCBL(t, e) {
    e.x && e.x,
    e.y && e.y,
    e.w && e.w;
    t = CE("div", t, (e.c || "pa") + (e.lc ? " " + e.lc : ""), {
        left: e.x + "px",
        top: e.y + "px",
        width: e.w + "px"
    });
    return t.cb = CFI(t, {
        t: "checkbox"
    }),
    t.cb.id = e.id,
    e.checked && (t.cb.checked = !0),
    e.click && (t.cb.cbClick = e.click,
    aE(t.cb, evt.MC, function(t) {
        this.cbClick(this)
    })),
    t.label = CE("label", t),
    CT(e.label, t.label),
    t.label.htmlFor = e.id,
    t
}
function sbAdd(t, e, s) {
    t = CE("option", t);
    return t.text = e,
    t.value = s,
    t
}
var TWEEN_MS = 40;
function njTween(t, e, s, a, i, o) {
    this.o = t,
    this.prop = e,
    this.sVal = s,
    this.cVal = s,
    this.eVal = a,
    this.dur = i,
    this.cb = o,
    this.ticks = Math.ceil(1e3 * i / TWEEN_MS),
    this.tVal = (s - a) / this.ticks;
    var r = this;
    this.tm = setInterval(function() {
        r.tick()
    }, TWEEN_MS),
    aE(t, "unload", function(t) {
        this.stop()
    })
}
function TRC(t) {
    t.parentNode && t.parentNode.removeChild(t)
}
function createDmgText(t, e, s, a, i, o) {
    o = o || 1;
    t = CTD(t, a, "pa damageText" + (i ? " " + i : ""), {
        left: e + "px",
        top: s + "px"
    });
    return t.alp = new njTween(t,"opacity",1.5,0,o,function(t) {
        t.parentNode && t.parentNode.removeChild(t)
    }
    ),
    t
}
njTween.prototype.stop = function() {
    clearInterval(this.tm)
}
,
njTween.prototype.tick = function() {
    this.o.style[this.prop] = this.cVal -= this.tVal,
    --this.ticks <= 0 && (this.stop(),
    this.cb) && this.cb(this.o)
}
;
var NS = "http://www.w3.org/2000/svg";
function SVG(t, e, s, a, i, o) {
    var r = document.createElementNS(NS, "svg");
    return r.style.position = "absolute",
    r.style.left = e + "px",
    r.style.top = s + "px",
    o && r.setAttribute("viewBox", o),
    r.style.width = a + "px",
    r.style.height = i + "px",
    t.appendChild(r),
    r
}
function SVGE(t, e, s) {
    var a, i = document.createElementNS(NS, e);
    for (a in s)
        if ("_c" == a)
            for (var o = 0; o < s[a].length; o++)
                SVGE(i, s[a][o]._t, s[a][o]);
        else
            "_t" != a && i.setAttributeNS(null, a, s[a]);
    return t && t.appendChild(i),
    i
}
function mSVG(t, e) {
    var s = document.createElementNS(NS, "svg");
    if (e.c && s.setAttribute("class", e.c),
    null != e.w && s.setAttribute("width", e.w),
    null != e.h && s.setAttribute("height", e.h),
    e.s && (e.d || (e.d = {}),
    e.d.width = e.d.height = e.s + "px"),
    e.n) {
        for (var a = 0; a < e.n[1].length; a++)
            SVGE(s, e.n[1][a]._t, e.n[1][a]);
        if (e.vb || (e.vb = e.n[0]),
        e.ov)
            for (a = 0; a < e.ov.length; a++)
                s.childNodes[e.ov[a][0]].setAttributeNS(null, e.ov[a][1], e.ov[a][2])
    }
    if (e.vb && s.setAttribute("viewBox", e.vb),
    e.d)
        for (var a in e.d)
            s.style[a] = e.d[a];
    return e.cb && aE(s, evt.MC, e.cb),
    t.appendChild(s),
    s
}
function getRelPos(t, e) {
    for (var s = 0; t && !isNaN(t[e]); )
        s += t[e],
        t = t.parentNode;
    return s
}
function dTDmg(t, e, s, a, i, o, r) {
    var t = CE("div", t, "pa targetDmgBox" + (i ? " " + i : ""), {
        left: (o && o.x < e ? o.x : e) + "px",
        top: (o && o.y < s ? o.y : s) + "px"
    })
      , i = SVG(t, 0, 0, 1, 1)
      , a = (t.label = CTD(t, a, "pa targetDmg", {
        left: 4 + (o && o.x < e ? e - o.x : 0) + "px",
        top: 2 + (o && o.y < s ? s - o.y : 0) + "px"
    }),
    t.label.offsetHeight + 4)
      , l = t.label.offsetWidth + 8
      , n = l
      , c = a;
    o && (SVGE(i, "path", {
        fill: "#FFFFFF",
        "fill-opacity": .4,
        stroke: "#FFFFFF",
        "stroke-width": 3,
        "stroke-opacity": .4,
        d: ["M" + (o.x - e), o.y - s, "L" + (0 + l / 2), 0 + a / 2].join(" ")
    }),
    n += Math.abs(e - o.x),
    c += Math.abs(s - o.y),
    i.setAttribute("viewBox", (o.x < e ? o.x - e : 0) + " " + (o.y < s ? o.y - s : 0) + " " + n + " " + c)),
    i.style.width = n + "px",
    i.style.height = c + "px",
    r && (t.icon = CI(t, "svg/" + r + ".svg", (o && o.x > e ? o.x - e : 0) - 8, (o && o.y > s ? o.y - s : 0) - 8, 16, 16));
    return t.alp = new njTween(t,"opacity",1.5,0,1,function(t) {
        t.parentNode && t.parentNode.removeChild(t)
    }
    ),
    t
}
function eSP(t) {
    return (t = t || window.event).preventDefault && t.preventDefault(),
    t.stopPropagation && t.stopPropagation(),
    t.cancelBubble = !0,
    t.returnValue = !1
}
function replaceHTMLCodes(t) {
    return t.replace(/&amp;/g, "&").replace(/&#62;/g, ">").replace(/&#60;/g, "<").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#33;/g, "!")
}
function repChars(t) {
    return t.replace(/&/g, "&amp;").replace(/>/g, "&#62;").replace(/</g, "&#60;").replace(/"/g, "&quot;").replace(/!/g, "&#33;").replace(/'/g, "&#39;")
}
function rcgp(t) {
    return unescape(encodeURIComponent(repChars(t)))
}
function getRGBShade(t, e) {
    for (var s, a = [0, 0, 0], i = 0; i < 3; i++)
        a[i] = s = 255 < (s = (s = (t >> 8 * i & 255) + e) < 0 ? 0 : s) ? 255 : s;
    return "rgb(" + a[2] + "," + a[1] + "," + a[0] + ")"
}
function getRGBTransform(t, e) {
    for (var s, a = [0, 0, 0], i = 2, o = 0; o < 3; o++,
    i--)
        255 < (s = (s = (t >> 8 * o & 255) * e[i] + e[i + 3]) < 0 ? 0 : s) && (s = 255),
        a[o] = Math.round(s);
    return "rgb(" + a[2] + "," + a[1] + "," + a[0] + ")"
}
function drawShape(t, e, s, a, i) {
    for (var a = SVGE(0, "path", {
        fill: a,
        stroke: s,
        "stroke-width": 1
    }), o = ["M" + e[0], e[1]], r = 2; r < e.length; r += 2)
        o.push((2 == r ? "L" : "") + e[r], e[r + 1]);
    return o.push(e[0], e[1]),
    a.setAttributeNS(null, "d", o.join(" ")),
    t.appendChild(a),
    a
}
function te(t) {
    var e, s;
    return t ? (t = t - Date.now() / 1e3) < 0 ? "Soon" : (e = Math.floor(t / 86400),
    s = Math.floor(t / 3600 % 24),
    e ? e + " days, " + s + " hours" : (e = Math.floor(t / 60 % 60),
    s ? s + " hours, " + e + " minutes" : (s = Math.floor(t % 60),
    e ? e + " minutes, " + s + " seconds" : s + " seconds"))) : "Never"
}
function useMap(t) {
    Plr.maps[t][8][16] = 0,
    Log.add("Now exploring " + Items.getShortDesc(Plr.maps[t]))
}
var Mkt = {
    I: {},
    get: function() {
        return pops.o[4]
    },
    tog: function() {
        var t, e = Mkt.get();
        if (e)
            return e.del();
        (e = new Popup(4,-1,-1,"")).tbc = new Radio(e.o,{
            c: "marketTabs",
            oc: Mkt.clkTab
        });
        var s = ["Market Search", "Sell Items", "Transfer"];
        for (e.tbc.tabs = new Array(s.length),
        t = 0; t < s.length; t++)
            e.tbc.tabs[t] = e.tbc.add(s[t], t);
        var a = CE("div", e.o, "mktWrap")
          , a = (e.controls = CE("div", a, "marketControls"),
        CE("div", a, "mktRes"))
          , a = (e.spc = CE("DIV", a, "marketItemsBox"),
        e.isb = CE("div", a, "mkItemSlot"),
        e.item = new ItemSlot(e.isb,{
            w: 40,
            ctrlClear: !0,
            params: {
                compareEQ: 1,
                noDrag: 1
            },
            drop: function(t, e) {
                Mkt.setItem(e)
            }
        }),
        e.buySellCb = 0,
        [{
            e: "div",
            cl: "mkCostFeeWrap",
            c: [{
                e: "div",
                cl: "",
                c: [{
                    e: "label",
                    txt: "Cost:"
                }, {
                    e: "input",
                    t: "text",
                    id: "mkSellCost",
                    ml: 6,
                    ev: ["keyup", Mkt.setFee]
                }]
            }, {
                e: "div",
                cl: "mkFeeWrap",
                c: [{
                    e: "label",
                    txt: "Fee:"
                }, {
                    e: "input",
                    t: "text",
                    id: "mkSellFee",
                    D: 1
                }]
            }]
        }, {
            e: "div",
            cl: "mkBuySellWrap",
            c: [{
                e: "div",
                cl: "",
                c: [{
                    e: "input",
                    t: "password",
                    id: "mkGpwd",
                    ph: "Gold Password"
                }]
            }, {
                e: "div",
                cl: "",
                c: [{
                    e: "input",
                    t: "button",
                    cl: "abutGradBl",
                    v: "Buy This Item",
                    id: "mkBuySell",
                    ev: [evt.MC, function(t) {
                        Mkt.get().buySellCb()
                    }
                    ]
                }]
            }]
        }]);
        mEa(e.isb, a),
        e.tbc.select(e.tbc.tabs[0])
    },
    clkTab: function(t, e) {
        var s = Mkt.get();
        if (s && s.tab != t.value) {
            dAC(s.controls),
            s.o.classList.remove("mkHide"),
            s.tab = t.value,
            Mkt.clear();
            for (var a = ["Buy", "Sell", "Transfer"], i = 0; i < a.length; i++)
                s.o.classList.remove("market" + a[i]);
            switch (s.o.classList.add("market" + a[t.value]),
            t.value) {
            case 0:
                Mkt.showBuy(s);
                break;
            case 1:
                eSP(e),
                Mkt.showSell(s);
                break;
            case 2:
                eSP(e),
                Mkt.showXfer(s)
            }
        }
    },
    clear: function(t) {
        var e = Mkt.get();
        e && (dAC(e.spc),
        e.item.clear(),
        t || (Mkt.I = {},
        e.results = []))
    },
    showBuy: function(t) {
        for (var e, s = [{
            e: "div",
            cl: "mkCtrlWrap",
            c: [{
                e: "label",
                txt: "Type:"
            }, {
                e: "select",
                po: "itemCat",
                poup: 1,
                sd: Items.types,
                ev: ["change", function(t) {
                    Mkt.setBuyType(this.selectedIndex, Mkt.get)
                }
                ]
            }]
        }, {
            e: "div",
            cl: "mkCtrlWrap",
            c: [{
                e: "select",
                po: "typeF",
                poup: 1,
                ev: ["change", function(t) {
                    Mkt.setSubType(Mkt.get)
                }
                ]
            }]
        }, {
            e: "div",
            cl: "mkCtrlWrap mkCtrlSmall",
            c: [{
                e: "label",
                txt: "Level Range:"
            }, {
                e: "select",
                po: "lvl",
                poup: 1,
                poi: 0,
                poim: 2,
                sbfe: 1
            }, {
                txt: "to"
            }, {
                e: "select",
                po: "lvl",
                poup: 1,
                poi: 1,
                sbfe: 1
            }]
        }, {
            e: "div",
            cl: "mkCtrlWrap mkCtrlSmall",
            c: [{
                e: "label",
                txt: "Magic Level:"
            }, {
                e: "select",
                po: "mag",
                poup: 1,
                poi: 0,
                poim: 2,
                sbfe: 1,
                sd: Items.magical
            }, {
                txt: "to"
            }, {
                e: "select",
                po: "mag",
                poup: 1,
                poi: 1,
                sbfe: 1,
                sd: Items.magical
            }]
        }, {
            e: "div",
            cl: "mkCtrlWrap mkCtrlSmall",
            c: [{
                e: "label",
                txt: "Cost Range:"
            }, {
                e: "input",
                type: "text",
                po: "minCost",
                poup: 1,
                v: 0,
                ml: 10
            }, {
                txt: "to"
            }, {
                e: "input",
                type: "text",
                po: "maxCost",
                poup: 1,
                v: 999999,
                ml: 10
            }]
        }], a = 0; a < 3; a++)
            s.push({
                e: "div",
                cl: "mkCtrlWrap mkCtrlMiniTxt",
                c: [{
                    e: "div",
                    cl: 0 == a ? "" : "h",
                    c: [{
                        e: "label",
                        txt: "Attributes:"
                    }, {
                        e: "label",
                        txt: "Min"
                    }]
                }, {
                    e: "select",
                    po: "attr",
                    poup: 1,
                    poi: a,
                    poim: 3,
                    sbfe: 1
                }, {
                    e: "input",
                    type: "text",
                    po: "attrMin",
                    poup: 1,
                    poi: a,
                    poim: 3,
                    ml: 5
                }]
            });
        for (s.push({
            e: "div",
            cl: "mkCtrlWrap mkCtrlCheckWrap",
            c: [{
                e: "input",
                t: "checkbox",
                id: "mkUsableCB"
            }, {
                e: "label",
                lFor: "mkUsableCB",
                txt: "Only Show Items I Can Use"
            }]
        }),
        s.push({
            e: "div",
            cl: "mkCtrlBWrap",
            c: [{
                e: "input",
                t: "button",
                cl: "abutGradBl",
                v: "Search",
                ev: [evt.MC, Mkt.search]
            }]
        }),
        mEa(t.controls, s),
        t.controls.typeS = -1,
        Mkt.setBuyType(0, Mkt.get),
        e = 0; e < 2; e++) {
            for (a = 0; a < Items.materials[5].length; a++)
                sbAdd(t.controls.lvl[e], Items.materials[5][a] + " (" + (a < 3 ? 0 : 5 * a - 10) + ")", a);
            t.controls.mag[e].options[1].text = "Normal"
        }
        Mkt.setAttrF(t.controls),
        mSVG(t.controls, {
            n: svgs.menuH,
            c: "mkArrow",
            ov: [[0, "stroke", "#FFF"], [0, "stroke-width", .25]]
        }),
        aE(t.controls, evt.MC, Mkt.clkCtrl),
        t.buySellCb = Mkt.buyItem,
        t.isb.classList.remove("mkSell", "mkXfer"),
        t.isb.classList.add("mkBuy"),
        gi("mkBuySell").value = "Buy This Item"
    },
    buyItem: function() {
        var t, e = Mkt.get();
        e.item.icon && (t = rcgp(gi("mkGpwd").value),
        njs.sendData([1, 30, 1, 7, 8, e.item.icon.i, 100, t]),
        gi("mkGpwd").value = "")
    },
    clkCtrl: function(t) {
        var e = Mkt.get().o;
        e.classList.contains("mkHide") && (e.classList.remove("mkHide"),
        eSP(t))
    },
    search: function(t) {
        eSP(t);
        t = Mkt.get();
        if (t && t.controls) {
            t.o.classList.add("mkHide");
            var e, s, a, i = 0, o = t.controls, r = o.lvl[0].selectedIndex - 1, l = o.lvl[1].selectedIndex - 1, n = o.mag[0].selectedIndex - 1, c = o.mag[1].selectedIndex - 1, d = parseInt(o.minCost.value), h = parseInt(o.maxCost.value);
            for ((l = -1 == l ? Items.materials[5].length - 1 : l) < (r = -1 == r ? 0 : r) && (l = r),
            (c = -1 == c ? Items.magical.length - 1 : c) < (n = -1 == n ? 0 : n) && (c = n),
            gi("mkUsableCB").checked ? i = Mkt.getUseOnlyFilter(o.typeS) : 0 != o.typeF.selectedIndex && (i = o.typeF.value),
            e = [1, 30, 1, 8, 1, 0, 1, o.itemCat.selectedIndex, 1, r, 1, l, 1, n, 1, c, 8, d = d || 0, 8, h = h || 0, 8, i],
            s = 0; s < 3; s++)
                e.push(1, 0 == o.attr[s].selectedIndex ? -1 : o.attr[s].options[o.attr[s].selectedIndex].value),
                a = parseInt(o.attrMin[s].value),
                e.push(3, a = a || 0);
            Fld.A("M", "S", 7e3, Mkt, e, 0),
            Mkt.clear(),
            CE("div", t.spc, "ladLoad").innerHTML = "Loading..."
        }
    },
    setItem: function(t) {
        var e = t.i
          , s = Mkt.get();
        Plr.items[e] ? (0 == s.tbc.selected.value && s.tbc.select(s.tbc.tabs[1]),
        1 == s.tbc.selected.value && (gi("mkSellCost").value = 1,
        Mkt.setFee(),
        gi("mkBuySell").value = "Sell This Item")) : Mkt.I[e] && (0 == s.tbc.selected.value ? s.item.icon.setCost(t.item[2]) : (gi("mkSellCost").value = t.item[2],
        Mkt.setFee(),
        gi("mkBuySell").value = "Edit Item"))
    },
    setBuyType: function(t, e) {
        var s, e = e();
        if (e && e.controls && (s = e.controls).typeS != t && (s.typeS = t,
        dAC(s.typeF),
        -1 != t)) {
            e = sbAdd(s.typeF, "Sub Type", -1);
            e.hidden = e.disabled = !0;
            for (var a = 0; a < Items.itemData[t].length; a++)
                sbAdd(s.typeF, Items.itemData[t][a][0], 1 << a);
            3 == t && sbAdd(s.typeF, "all maps", 32736),
            Mkt.setAttrF(s)
        }
    },
    setSubType: function(t) {
        t = t();
        t && t.controls && Mkt.setAttrF(t.controls)
    },
    setAttrF: function(t) {
        var e, s, a, i = [];
        for (i[4] = t.itemCat.value,
        i[5] = t.typeF.selectedIndex - 1,
        15 == i[5] && i[5]--,
        a = Items.getStatTbl(i),
        s = 0; s < 3; s++)
            for (e in dAC(t.attr[s]),
            sbAdd(t.attr[s], "", -1),
            a)
                a[e].length && sbAdd(t.attr[s], a[e][2] || "Quantity", e)
    },
    finish: function() {
        var t, e = Mkt.get();
        if (e) {
            var s = 0;
            e.items = [],
            dAC(e.spc);
            for (var a = 0; a < e.results.length; a++)
                t = e.results[a],
                Mkt.I[t] && (e.items[t] = new Item(e.spc,Mkt.I[t],0,0,{
                    compareEQ: 1,
                    shiftClick: 1
                }),
                e.items[t].setCost(Mkt.I[t][2]),
                s++);
            s || (CE("div", e.spc, "ladLoad").innerHTML = "No items found.")
        }
    },
    getFS: function() {
        njs.sendBytes(30, 1)
    },
    showSell: function(t) {
        var e = t.controls
          , s = (Inv.setTab(1),
        Mkt.getFS(),
        CTD(e, "?", "mkSellHelp"));
        aE(s, "mouseover", function(t) {
            this.tip = new Tip(this,t),
            CTD(this.tip.o, ["Drag an item to the trashcan to remove the item and delete it from the market.", "", "Drag an item into your inventory to remove it from the market.", "", "To lower the for sale cost of your item, drag it to the square, change the cost and click the Edit Item button.", "", "To sell an item, drag it from your inventory to the square, and select the price.", "", "** Note: If your cost is 20 fg or higher, the fee will be deducted from your gold immediately, rather than when the item sells."], "tipHelp"),
            this.tip.finish()
        }),
        aE(s, "mouseout", function(t) {
            this.tip = this.tip.del()
        }),
        t.aT = CE("div", CE("div", t.itmW, "invIWSide"), "itemSlotBox"),
        evt.addDropEvt(t.aT, function(t) {
            njs.sendData([1, 20, 1, 2, 8, t.i])
        }),
        mSVG(s = CE("div", CE("div", e), "itemSlotBox"), {
            n: svgs.trash,
            c: "tbIcon"
        }),
        evt.addDropEvt(s, function(t) {
            Mkt.I[t.i] && t.item[1] == njs.uid && njs.sendData([1, 30, 1, 3, 8, t.i])
        }),
        t.buySellCb = Mkt.sellItem,
        t.isb.classList.remove("mkBuy", "mkXfer"),
        t.isb.classList.add("mkSell"),
        gi("mkBuySell").value = "Sell This Item"
    },
    sellItem: function() {
        var t = Mkt.get();
        if (t.item.icon) {
            var e = t.item.icon.item
              , s = parseFloat(gi("mkSellCost").value);
            if (!(isNaN(s) || s < 1)) {
                if (Plr.items[t.item.icon.i]) {
                    t = rcgp(gi("mkGpwd").value);
                    njs.sendData([1, 30, 1, 6, 8, e[0], 16, s, 100, t])
                } else {
                    if (!Mkt.I[e[0]] || e[1] != njs.uid || s > e[2])
                        return;
                    njs.sendData([1, 30, 1, 5, 8, e[0], 16, s])
                }
                gi("mkGpwd").value = ""
            }
        }
    },
    showXfer: function(t) {
        var e, s, a, i = t.controls;
        for (Inv.setTab(1),
        i.tbc = new Radio(t.spc,{
            c: "marketChars"
        }),
        s = 0; s < Plr.sChars.length; s++)
            a = Plr.sChars[s],
            Plr.chars[a][0] == Plr.char || Plr.chars[a][4] != Plr.c[4] || 1 == Plr.chars[a][4] && Plr.chars[a][11] || -1 == Plr.chars[a][5] || (i.tbc.add(Plr.chars[a][2] + " - Level " + Plr.chars[a][6] + " " + CStats.classData[Plr.chars[a][5]][0], a),
            0);
        aE(e = CTD(i, "?", "mkSellHelp"), "mouseover", function(t) {
            this.tip = new Tip(this,t),
            CTD(this.tip.o, ["To transfer an item click a character to select it, then drag an item to the box on the bottom.", "To complete the transfer, click the Transfer Item button."], "tipHelp"),
            this.tip.finish()
        }),
        aE(e, "mouseout", function(t) {
            this.tip = this.tip.del()
        }),
        t.buySellCb = Mkt.xferItem,
        t.isb.classList.add("mkXfer"),
        t.isb.classList.remove("mkBuy", "mkSell"),
        gi("mkBuySell").value = "Transfer Item"
    },
    xferItem: function() {
        var t, e = Mkt.get();
        e.item.icon && e.controls.tbc.selected && (t = e.item.icon.item,
        njs.sendData([1, 30, 1, 4, 8, t[0], 8, e.controls.tbc.selected.value]))
    },
    setFee: function() {
        var t = gi("mkSellCost")
          , e = parseFloat(t.value);
        isNaN(e) || e < 1 ? e = t.value = 1 : 100 <= e && (e = parseInt(e),
        t.value = e),
        gi("mkSellFee").value = Math.floor(5 * e) / 100
    },
    addItem: function(t) {
        var e = Mkt.get();
        e && e.results.push(t)
    },
    delItem: function(t) {
        Mkt.I && delete Mkt.I[t];
        var e = Mkt.get();
        e && (e.items && e.items[t] && (e.items[t].del(),
        e.items[t] = null),
        e.item.icon) && e.item.icon.i == t && (e.item.clear(),
        1 == e.tab) && (Mkt.clear(),
        Mkt.getFS())
    },
    getItem: function(t, e) {
        Mkt.I[t][1] != njs.uid && (Plr.gold -= parseFloat(Mkt.I[t][2]),
        Gs.setGold()),
        Mkt.I[t][0] = e,
        Plr.items[e] = Mkt.I[t],
        Plr.items[e][1] = Plr.char,
        Plr.items[e][3] = 0,
        Plr.items[e][2] = 0,
        Mkt.delItem(t),
        Inv.addItem(e),
        Sound.item()
    },
    editSellCost: function(t, e) {
        var s = Mkt.get();
        s && s.items && s.items[t] && s.items[t].setCost(e)
    },
    getUseOnlyFilter: function(t) {
        for (var e = 0, s = 0; s < Items.itemData[t].length; s++)
            CStats.classData[Plr.c[5]][t + 2][s] && (e += 1 << s);
        return e
    },
    itemSold: function(t) {
        var e = [t[0], 0, t[1], 0, t[2], t[3], t[4], t[5]];
        Log.add("Your [" + Items.getName(e) + "] was purchased [" + t[1] + " fg]"),
        Plr.gold += t[1],
        Gs.setGold()
    }
}
  , MQ = {
    show: function() {
        clearBG(3),
        Plr.stopHealTimer(),
        Popup.closeAll(),
        Gs.topbar.classList.add("hide"),
        Gs.o.classList.add("hide"),
        MQ.make(),
        bg.mqC = CE("div", bg, "mqControls"),
        CTD(bg.mqC, ["Before you lies the Master Quest challenge. Once you choose to begin, there is no turning back. Whether you pass or fail, your character will be rerolled to level 1, retaining all proficiencies and equipment. If you pass, you will unlock the next class.", "", "Do you wish to continue?"], "fs11 fcw tac");
        var t = CE("div", bg.mqC, "mqBWrap");
        CAB({
            p: t,
            c: "abutGradBl mqAttempt",
            v: "Attempt Master Quest",
            oc: function(t) {
                njs.sendBytes(99, 0)
            }
        }),
        CAB({
            p: t,
            c: "abutGradBl mqAbort",
            v: "Abort",
            oc: function(t) {
                Gs.topbar.classList.remove("hide"),
                Gs.o.classList.remove("hide"),
                Plr.startHealTimer(),
                Town.show()
            }
        })
    },
    make: function(t) {
        var e = bg.mq = CE("div", bg, "mqPage")
          , s = bg.mqv = CE("div", CE("div", e, "mqWrap"), "mqView" + (t ? " " + t : ""))
          , a = (bg.mq.door = CE("div", s, "mqDoor"),
        bg.mq.door.drop = function(t) {}
        ,
        cS(bg.mq.door, {
            s: "svg/iconDoorL.svg",
            w: 95,
            h: 155,
            c: "mqDoorL"
        }).drop = MQ.doorDrop,
        140)
          , i = d = 30;
        for (bg.mq.maxW = a,
        bg.mq.maxH = d,
        h = 0; h < 3; h++)
            bg.mq.maxW *= 1.3,
            bg.mq.maxH *= 1.3,
            i += bg.mq.maxH;
        s.svg = mSVG(s, {
            vb: "0 0 " + bg.mq.maxW + " " + i,
            w: bg.mq.maxW,
            h: i,
            c: "mqStairs"
        });
        var o, r = 0;
        for (bg.stairs = [],
        SVGE(s.svg, "defs", {
            _c: [{
                _t: "linearGradient",
                id: "mqGrad1",
                x1: "0%",
                y1: "0%",
                x2: "0%",
                y2: "100%",
                _c: [{
                    _t: "stop",
                    offset: "0%",
                    "stop-color": "#888888",
                    "stop-opacity": 1
                }, {
                    _t: "stop",
                    offset: "100%",
                    "stop-color": "#3C3C3C",
                    "stop-opacity": 1
                }]
            }]
        }),
        h = 0; h < 4; h++)
            o = (bg.mq.maxW - a) / 2,
            bg.stairs[h] = [o, r, a, d],
            SVGE(s.svg, "rect", {
                width: a,
                height: d,
                fill: "url(#mqGrad1)",
                stroke: "#666666",
                "stroke-width": 1,
                x: o + "px",
                y: r + "px"
            }),
            r += d,
            a *= 1.3,
            d *= 1.3;
        for (var l, n = 0, c = 0, d = 50, r = 0, h = 0; h < 3; h++)
            l = CI(s, "svg/iconTorch.svg", 0, 0, a = d / 132 * 28, d),
            n ? n -= 1.3 * (50 + (h + 1)) : n = bg.mq.door.offsetLeft - 25 - a,
            r ? r += 1.3 * (65 + (h + 1)) : r = bg.mq.door.offsetTop + (155 - d) / 2,
            l.style.left = n + "px",
            l.style.top = r + "px",
            l = CI(s, "svg/iconTorch.svg", 0, 0, a, d),
            c ? c += 1.3 * (50 + (h + 1)) : c = bg.mq.door.offsetLeft + 95 + 21,
            l.style.left = c + "px",
            l.style.top = r + "px",
            d *= 1.3;
        bg.z = 0
    },
    drawKeys: function(t, e) {
        var s = bg;
        bg.keyCount = t,
        evt.initDD(),
        bg.keys = new Array(bg.keyCount);
        for (var a = 0; a < bg.keyCount; a++)
            e & 1 << a && (bg.keys[a] = new MQK(a,s));
        MQ.keys(0)
    },
    enterDoor: function(t) {
        bg.mqC = bg.mq;
        var e = bg.mqv;
        t ? (MQ.make("inBack"),
        bg.insertBefore(bg.mq, bg.mqC),
        setTimeout(function() {
            bg.mqv.classList.add("fadein"),
            setTimeout(MQ.stairs, 5e3)
        }, 2e3)) : setTimeout(CS.show, 6e3),
        e.classList.add("fadeout")
    },
    doKey: function(t) {
        var e = ""
          , s = 0;
        t ? (e = "Click, the door unlocks.",
        t == bg.keyCount ? (MQ.enterDoor(!1),
        e += " A shining light welcomes you warmly. Congratulations! You have successfully completed the master quest!",
        Plr.c[14] == CStats.classData[Plr.c[5]][1] ? 7 == Plr.c[14] ? (e += " You have completed the Ladder! Your name will be added to the Hall of Fame! All ladder points are being reset, and all items on the market are being returned to their owners. Congratulations!",
        Plr.c[13]++,
        Plr.c[12] = Plr.c[14] = 0) : (e += " You have unlocked the next secret character! Congratulations!",
        Plr.c[14]++) : e += " Since you did not use the unlocked character, you do not receive any additional points.",
        s = 1) : MQ.enterDoor(!0)) : (e = "Boom, the door explodes into a cloud of dust. You have failed the test.",
        s = 1,
        bg.removeChild(bg.mq),
        setTimeout(CS.show, 5e3)),
        Log.add(e),
        s && (Plr.c[6] = 0,
        Plr.c[5] = -1,
        Plr.c[12]++)
    },
    keys: function(t) {
        for (var e in bg.keys)
            bg.keys[e].o.style.display = t ? "block" : "none"
    },
    stairs: function(t, e) {
        if (bg.mq || MQ.show(),
        bg.keys || MQ.drawKeys(t, e),
        0 == bg.z && (bg.mqC && bg.removeChild(bg.mqC),
        bg.mqC = null),
        3 < bg.z)
            return bg.mqv.classList.remove("inBack"),
            bg.mqv.classList.remove("fadein"),
            bg.mqv.classList.add("inFront"),
            MQ.keys(1);
        bg.mqv.classList.add("z" + ++bg.z),
        setTimeout(MQ.stairs, 2e3)
    },
    doorDrop: function(t) {
        t = t.i;
        njs.sendBytes(99, t + 1),
        bg.removeChild(bg.keys[t].o),
        delete bg.keys[t],
        MQ.keys(0)
    }
};
function MQK(t, e) {
    var s, a = 0 - 80 * bg.keyCount / 2 + 80 * t;
    for (this.o = CE("div", e, "mqKey cp pa", {
        left: "calc(50% + " + a + "px)",
        top: "30px"
    }),
    this.key = mSVG(this.o, {
        n: svgs.iconKey,
        s: 80
    }),
    s = 0; s < 2; s++)
        this.key.childNodes[s].id = "mqKey" + s + "Grad" + t,
        this.key.childNodes[s].childNodes[1].setAttributeNS(null, "stop-color", MQK.kc[t]),
        this.key.childNodes[s + 3].setAttributeNS(null, "fill", "url(#mqKey" + s + "Grad" + t + ")");
    this.ox = a + 80 * t,
    this.oy = 30,
    this.i = t,
    this.d = 0,
    aE(this.o, evt.MD, this.click.bind(this))
}
function Radio(t, e) {
    this.o = CE("div", t, "njRBWrap" + (e.c ? " " + e.c : "")),
    this.eClick = e.oc,
    this.dClick = e.dc
}
MQK.prototype.click = function(t) {
    dragO || ((dragO = this).ow = (Plr.isM ? t.changedTouches[0].pageX : t.clientX) - this.o.offsetLeft,
    dragO.oh = (Plr.isM ? t.changedTouches[0].pageY : t.clientY) - this.o.offsetTop,
    this.o.style.pointerEvents = "none",
    dragO.cbUp = this.up.bind(this))
}
,
MQK.prototype.up = function(t, e) {
    for (dragO = null,
    this.o.style.pointerEvents = "auto"; t; ) {
        if (t.drop) {
            t.drop(this);
            break
        }
        t = t.parentNode
    }
}
,
MQK.kc = ["rgb(255,153,0)", "rgb(192,192,192)", "rgb(184,115,51)", "rgb(84,84,84)", "rgb(139,35,35)", "rgb(8,37,103)"],
Radio.prototype.add = function(t, e, s) {
    var a = this
      , t = this.t = CTD(this.o, t, "njRB" + (s ? " " + s : ""));
    return t.value = e,
    t.selected = !1,
    aE(t, evt.MC, function(t) {
        a.select(this, t)
    }),
    t
}
,
Radio.prototype.del = function(t) {
    t && (t == this.selected && (this.selected = null),
    this.o.removeChild(t))
}
,
Radio.prototype.select = function(t, e) {
    return this.selected == t ? this.dClick ? this.dClick(t) : void 0 : (this.selected && this.unselect(this.selected),
    (this.selected = t).selected = !0,
    t.classList.add("sel"),
    !(!this.eClick || !this.eClick(t, e)) || void 0)
}
,
Radio.prototype.unselect = function(t) {
    t.selected && (t.selected = !1,
    t.classList.remove("sel"),
    this.selected = null)
}
,
Radio.prototype.clear = function() {
    dAC(this.o),
    this.selected = null
}
;
var Plr = {
    char: -1,
    c: 0,
    g: 0,
    itemW: 40,
    dnd: 0,
    autoPilot: 0,
    gEB: 0,
    abSelId: -1,
    qiSlots: 5,
    target: {
        timer: 0,
        kC: 0,
        kA: 0,
        kS: 0,
        id: 0,
        cb: 0,
        set: function(t, e, s) {
            t && (Plr.target.kC = t.ctrlKey || t.metaKey,
            Plr.target.kA = t.altKey,
            Plr.target.kS = t.shiftKey),
            Plr.target.id = e,
            (Plr.target.cb = s) && Plr.target.tick()
        },
        start: function() {
            Plr.target.timer || (Plr.target.timer = setInterval(Plr.target.tick, 275))
        },
        tick: function() {
            Plr.target.cb && Plr.target.cb(Plr.target.id, Plr.target.kC, Plr.target.kA, Plr.target.kS)
        },
        stop: function() {
            Plr.target.timer && (Plr.target.timer = clearInterval(Plr.target.timer))
        }
    },
    clear: function() {
        Plr.stop(),
        Plr.g && Plr.g.del(),
        Plr.c = Plr.g = Plr.inCombat = 0,
        Plr.char = -1
    },
    stop: function() {
        Plr.target.stop(),
        Plr.stopHealTimer()
    },
    setAbilities: function(t) {
        var e, s, a = 2, i = Stats.get();
        for (Plr.c[55] || (Plr.c[55] = []); a < t.byteLength; )
            e = t.getUint8(a++),
            s = t.getUint8(a++),
            Plr.c[55][e] = s,
            i && i.abIcons[e].setLevel(s)
    },
    doHealTimer: function() {
        try {
            var t = 1 + Math.floor(Plr.c[6] / 5) + Math.floor(Plr.c[18] / 25) + Plr.c[56][9]
              , e = 1 + Math.floor(Plr.c[6] / 5) + Math.floor(Plr.c[19] / 25) + Plr.c[56][10]
              , s = Plr.c[56][32]
              , a = Plr.c[20] - Plr.c[22];
            a && (a < t && (t = a),
            Plr.adjustStat(Plr.c, 22, t)),
            (a = Plr.c[21] - Plr.c[23]) && (a < e && (e = a),
            Plr.adjustStat(Plr.c, 23, e)),
            Plr.c[6] < 71 && s && 0 < (s = (a = 1e6 * Plr.c[6] - Plr.c[9] - 1) < s ? a : s) && Plr.setStat(Plr.c, 9, Plr.c[9] + s)
        } catch (t) {
            Plr.stopHealTimer()
        }
    },
    startHealTimer: function() {
        Plr.healTimer || (Plr.healTimer = setInterval(Plr.doHealTimer, 1e3))
    },
    stopHealTimer: function() {
        Plr.healTimer && (clearInterval(Plr.healTimer),
        Plr.healTimer = 0)
    },
    setStat: function(t, e, s) {
        var a;
        t == Plr.c ? (t[e] = s,
        Plr.updateStat(e, s, !0)) : t && (a = Plr.getGStatIdFromPStatId(e),
        t = t[0],
        -1 != a) && (Plr.g.members[t][a] = s,
        Plr.g.updatePlayerStat(t, e, s))
    },
    adjustStat: function(t, e, s) {
        var a;
        t == Plr.c ? (t[e] += s,
        Plr.updateStat(e, s, !1)) : t && (a = Plr.getGStatIdFromPStatId(e),
        t = t[0],
        -1 != a) && (Plr.g.members[t][a] += s,
        Plr.g.updatePlayerStat(t, e, s))
    },
    getStats: function(t, e, s, a) {
        for (var i, o = 5; o < t.byteLength; )
            switch (i = t.getUint8(o++)) {
            case 24:
            case 4:
            case 43:
            case 44:
            case 45:
            case 7:
            case 8:
            case 29:
            case 30:
            case 40:
            case 48:
            case 41:
            case 49:
            case 50:
            case 39:
                a(e, i, s ? t.getInt8(o++) : t.getUint8(o++));
                break;
            case 6:
            case 20:
            case 21:
            case 22:
            case 23:
            case 16:
            case 17:
            case 18:
            case 19:
            case 46:
                a(e, i, s ? t.getInt16(o, njs.LE) : t.getUint16(o, njs.LE)),
                o += 2;
                break;
            case 9:
            case 11:
            case 10:
            case 31:
                a(e, i, s ? t.getInt32(o, njs.LE) : t.getUint32(o, njs.LE)),
                o += 4;
                break;
            case 47:
                a(e, i, t.getFloat64(o, njs.LE)),
                o += 8
            }
    },
    setStats: function(t, e) {
        var s = t.getUint32(1, njs.LE)
          , s = Plr.chars[s] || (Plr.g && Plr.g.members ? Plr.g.members[s] : null);
        s && Plr.getStats(t, s, !e, e ? Plr.setStat : Plr.adjustStat)
    },
    updateStat: function(t, e, s) {
        var a = 0;
        switch (t) {
        case 22:
        case 20:
            Plr.c[22] <= 0 && (Plr.c[22] = 0),
            Plr.c[22] > Plr.c[20] && (Plr.c[22] = Plr.c[20]),
            Gs.char.setLife(Plr.c[22], Plr.c[20]),
            a = 1;
            break;
        case 23:
        case 21:
            Plr.c[23] > Plr.c[21] && (Plr.c[23] = Plr.c[21]),
            Gs.char.setMana(Plr.c[23], Plr.c[21]),
            a = 1;
            break;
        case 9:
            Stats.exp(),
            Plr.updateExpBar(),
            e < 0 && (Gs.char.exp.o.classList.add("animBgRed"),
            setTimeout( () => {
                Gs && Gs.char && Gs.char.exp && Gs.char.exp.o.classList.remove("animBgRed")
            }
            , 3e3));
            break;
        case 6:
            Plr.c[22] = Plr.c[20],
            Plr.c[23] = Plr.c[21],
            Gs.char.setLevel(Plr.c[6]),
            Plr.updateExpBar(),
            Gs.char.setLife(Plr.c[22], Plr.c[20]),
            Gs.char.setMana(Plr.c[23], Plr.c[21]),
            a = 1,
            Log.add("You have gained a level."),
            Sound.play(0),
            bg.lastMobLvl && ++bg.lastMobLvl,
            Inv.clear(),
            Stats.set();
            break;
        case 24:
            Inv.clear(),
            Inv.setEqSlots();
            break;
        case 8:
        case 7:
            Gs.setStatsGlow(),
            Stats.set();
            break;
        case 11:
            Log.add("You have died."),
            Prof.doDeathPenalty(),
            Stats.set();
            break;
        case 10:
        case 16:
        case 17:
        case 19:
        case 18:
            Stats.set();
            break;
        case 48:
            Plr.inCata() && Gs.char.setPosition(e, 1);
            break;
        case 46:
            e > Plr.pms && Log.add("You have " + (e - Plr.pms) + " new message(s)."),
            Plr.pms = e;
            break;
        case 47:
            Plr.gold = +e.toFixed(2),
            Gs.setGold();
            break;
        case 40:
            Plr.lfg = e;
            break;
        case 3:
            Log.add(38);
            break;
        case 41:
            e ? Maze.create() : Cata.gotoTown(),
            Plr.g.redrawLocs()
        }
        a && Shrine.setStats()
    },
    updateExpBar: function() {
        var t = Math.floor(Plr.c[9] - 1e6 * (Plr.c[6] - 1)) / 1e6;
        Gs.char.setExp(t)
    },
    getGStatIdFromPStatId: function(t) {
        switch (t) {
        case 22:
            return 3;
        case 20:
            return 4;
        case 23:
            return 5;
        case 21:
            return 6;
        case 6:
            return 2;
        case 9:
            return 7;
        case 48:
            return 11;
        case 41:
            return 12;
        case 29:
            return 9;
        case 30:
            return 10;
        case 49:
            return 16;
        case 50:
            return 17;
        default:
            return -1
        }
    },
    setBonusStats: function(t, e) {
        if (-1 == t) {
            for (Plr.c[56] = [],
            a = 0; a < Items.bonusStats.length; a++)
                Plr.c[56][a] = 0;
            for (var s = [Plr.c[25], Plr.c[26], Plr.c[27]], a = 0; a < s.length; a++)
                s[a] && Plr.items[s[a]] && Plr.setBonusStats(Plr.items[s[a]], 1)
        } else if (t)
            for (a = 0; a < Items.bonusStats.length; a++)
                e ? Plr.c[56][a] += t[8][a] : Plr.c[56][a] -= t[8][a]
    },
    doEquipItem: function(t, e) {
        var s = Plr.items[t]
          , a = 25 + e
          , i = Plr.c[a]
          , a = (Plr.c[a] = t,
        3 != e && (Plr.setBonusStats(Plr.items[i], 0),
        Plr.setBonusStats(s, 1)),
        s[4] <= 1 && (Plr.c[29 + s[4]] = s[5],
        Gs.char.setEquip(s[4], s[5])),
        1 != a && Gs.updateAtkTypes(),
        Inv.get());
        a && (a.eq[e].set(s),
        Inv.remItem(t),
        i && Inv.addItem(i),
        Inv.setEqSlots(),
        e < 3) && Stats.set()
    },
    equipAccessory: function(t) {
        Plr.doEquipItem(t, 3)
    },
    equipItem: function(t) {
        var e = Plr.items[t];
        3 == e[4] ? (Inv.delItem(t),
        Stats.set()) : Plr.doEquipItem(t, e[4])
    },
    unequipItem: function(t) {
        for (var e = [25, 26, 27, 28], s = 0; s < e.length; s++)
            if (Plr.c[e[s]] == t) {
                3 != s && Plr.setBonusStats(Plr.items[t], 0),
                Plr.c[e[s]] = 0;
                var a = Inv.get();
                if (!a)
                    return;
                a.eq[s].clear(),
                Inv.addItem(t),
                Gs.updateAtkTypes(),
                2 != Gs.selAtk || Gs.atk[2].icon || Gs.setSelAtk(0);
                break
            }
    },
    setItemBaseStats: function(t, e) {
        for (var s, a, i = Plr.items[e] || Mkt.I[e], o = 5; o < t.byteLength; )
            2 === (s = t.getUint8(o++)) && (a = t.getFloat64(o, njs.LE),
            o += 8,
            i) && (i[s] = a,
            Mkt.editSellCost(e, a))
    },
    setItemBonusStats: function(t, e) {
        for (var s, a = Plr.items[e] || Mkt.I[e], i = 5; i < t.byteLength; )
            switch (s = t.getUint8(i++)) {
            case 5:
            case 6:
                r = njs.getUint24(t, i),
                i += 3,
                a && (a[8][s] = r);
                break;
            case 0:
                r = t.getUint16(i, njs.LE),
                i += 2,
                a && (a[8][s] = r);
                break;
            case 15:
                r = t.getInt16(i, njs.LE),
                i += 2,
                a && (a[8][s] = r);
                break;
            case 16:
                var o, r = t.getInt16(i, njs.LE);
                i += 2,
                a && (a[8][s] = r,
                (o = Inv.get()) && e in o.itemsL && o.items[o.itemsL[e]].icon && o.items[o.itemsL[e]].icon.setQuantity(r),
                e in Gs.qItems) && Gs.qSlot[Gs.qItems[e]].icon.setQuantity(r)
            }
    },
    checkItemAutoStack: function(t) {
        var e, s, a, i = Plr.items[t], o = !1, r = !1, l = 0;
        if (i && (r = !!(4 == i[4] && 1 == i[5] || 3 == i[4] && 3 == i[5] && (a = Skill.get()) && (Plr.autoStackFish && (o = !0),
        o = !(0 == a.type && Plr.asfMin && (l = Items.getFishPercent(i)) < Plr.asfMin) && o)) || r))
            for (e in Plr.items)
                if ((s = Plr.items[e]) != i && s[4] == i[4] && s[5] == i[5] && s[6] == i[6] && s[7] == i[7]) {
                    if (o) {
                        if ((s[8][15] ? 1 : 0) != (i[8][15] ? 1 : 0) || (s[8][5] ? 1 : 0) != (i[8][5] ? 1 : 0) || (s[8][6] ? 1 : 0) != (i[8][6] ? 1 : 0) || (s[8][0] ? 1 : 0) != (i[8][0] ? 1 : 0))
                            continue;
                        if (l && Items.getFishPercent(s) < Plr.asfMin)
                            continue
                    }
                    return Items.stackItem(e, t)
                }
    },
    destroyGroup: function() {
        return Gs.remDoor(),
        Plr.g.del(),
        Plr.g = null,
        Drops.clear(),
        Cata.mobs = [],
        Plr.startHealTimer(),
        Gs.char.setPosition(2),
        Grp.close(),
        Log.add("You have left the group."),
        bg.dock && closeLake(),
        Town.show()
    },
    inCata: function() {
        return 1 == Plr.c[41]
    },
    setGroupData: function(t, e, s, a) {
        Grp.close();
        var i = 0;
        Plr.g ? (Plr.g.setLeader(s),
        Plr.g.flags = t,
        Plr.g.name = a) : (Plr.g = new Group(t,s,a),
        Grp.L = {},
        Plr.c[48] = 0,
        Maze.clear(),
        i = 1),
        Plr.g.lvlRng = e,
        Plr.g.isLeader() ? (Gs.addEng(),
        Gs.hideControlButtons(),
        !Plr.inCombat && Plr.inCata() && Gs.togEng(0),
        t && i && Log.add("You have created a group.")) : Gs.remEng()
    },
    getIdFromGroupName: function(t) {
        if (Plr.g)
            for (var e in Plr.g.members)
                if (Plr.g.members[e][13] && Plr.g.members[e][13].toLowerCase() == t.toLowerCase())
                    return e;
        return 0
    },
    getChar: function(t) {
        return t == Plr.char ? Plr.c[51] : Plr.g.members[t][15]
    }
}
  , Settings = {
    loadChar: function(t) {
        var e;
        Plr.cd = 0,
        localStorage.cd && (e = JSON.parse(localStorage.cd))[t] && (Plr.cd = e[t]),
        Plr.cd || (Plr.cd = {}),
        Plr.cd.sa || (Plr.cd.sa = 0),
        Plr.cd.qb || (Plr.cd.qb = new Array(9)),
        Plr.cd.ii || (Plr.cd.ii = new Array(16)),
        Plr.cd.ie || (Plr.cd.ie = new Array),
        Plr.cd.ab || (Plr.cd.ab = new Array(3))
    },
    saveChar: function(t) {
        var e, s, a = localStorage.cd ? JSON.parse(localStorage.cd) : {};
        for (e in a[t] = Plr.cd,
        a[t].qb = new Array(9),
        Gs.qSlot)
            Gs.qSlot[e].icon && (a[t].qb[e] = Gs.qSlot[e].icon.i);
        for (e = 0; e < 3; e++)
            a[t].ab[e] = Plr.cd.ab[e];
        for (e in s = [],
        Plr.cd.ie)
            Plr.items[Plr.cd.ie[e]] && (s[e] = Plr.cd.ie[e]);
        for (e in a[t].ie = s,
        s = [],
        Plr.cd.ii)
            Plr.items[Plr.cd.ii[e]] && (s[e] = Plr.cd.ii[e]);
        a[t].ii = s,
        localStorage.cd = JSON.stringify(a)
    },
    saveKey: function() {
        for (var t = new Array(Plr.keymap.length), e = new Array(Plr.keymap.length), s = 0; s < Plr.keymap.length; s++)
            t[s] = Plr.keymap[s],
            e[s] = Plr.keycodes[s];
        localStorage.keys = JSON.stringify(t),
        localStorage.keyc = JSON.stringify(e)
    },
    km: function() {
        Plr.keymap = [13, 27, 67, 70, 73, 76, 79, 80, 86, 77, 72, 32, 81, 69, 82, 71, 90, 84, 65, 87, 68, 83, 37, 38, 39, 40, 49, 50, 51, 52, 53, 54, 55, 56, 57, 17, 18, 16],
        Plr.keycodes = new Array(Plr.keymap.length)
    },
    load: function() {
        Settings.km();
        for (var t, e = ["autoxfer", "noAHA", "autoPilot", "ctrlDoor", "noItemComp", "hideArrows", "dark", "hideAbort", "autoStackFish", "qiSlots"], s = 0; s < e.length; s++)
            isNaN(localStorage[e[s]]) || (Plr[e[s]] = parseInt(localStorage[e[s]]));
        Plr.asfMin = isNaN(localStorage.asfMin) ? 0 : parseInt(localStorage.asfMin),
        Settings.loadKey(),
        localStorage.pops && (t = JSON.parse(localStorage.pops)) && parseInt(t.ih) == window.innerHeight && parseInt(t.iw) == window.innerWidth ? (pops.x = t.x,
        pops.y = t.y,
        pops.w = t.w,
        pops.h = t.h) : localStorage.removeItem("pops"),
        localStorage.vc && (t = JSON.parse(localStorage.vc)) && (Vlt.uc = t)
    },
    loadKey: function() {
        if (localStorage.keys) {
            var t = JSON.parse(localStorage.keys);
            if (!(t.length < Plr.keymap.length))
                for (var e = JSON.parse(localStorage.keyc), s = 0; s < Plr.keymap.length; s++)
                    Plr.keymap[s] = t[s],
                    Plr.keycodes[s] = e[s]
        }
    },
    resetKey: function() {
        Settings.km(),
        localStorage.removeItem("keys"),
        localStorage.removeItem("keyc")
    },
    get: function() {
        return pops.o[10]
    },
    tog: function() {
        var t, e = Settings.get();
        if (e)
            return e.del();
        for ((e = new Popup(10,-1,-1,"")).keys = new Array(Plr.keymap.length),
        e.keyc = new Array(Plr.keymap.length),
        t = 0; t < Plr.keymap.length; t++)
            e.keys[t] = Plr.keymap[t],
            e.keyc[t] = Plr.keycodes[t];
        e.tbc = new Radio(e.o,{
            c: "settingsTabs",
            oc: function(t) {
                var e = Settings.get();
                e && e.tab != t.value && (e.tab = t.value,
                e.controls && e.o.removeChild(e.controls),
                e.controls = CE("div", e.o),
                t.cb(e))
            }
        });
        var s = [["General Settings", Settings.g], ["Keyboard Config", Settings.k], ["Vault Categories", Settings.c]];
        for (e.tbc.tabs = new Array(s.length),
        t = 0; t < s.length; t++)
            e.tbc.tabs[t] = e.tbc.add(s[t][0], t),
            e.tbc.tabs[t].cb = s[t][1];
        e.tbc.select(e.tbc.tabs[0])
    },
    g: function(t) {
        t.controls.innerHTML = '<div><fieldset class="fsLegend"><legend>Gameplay</legend><div class="stTxtInp"><label></label><label>Sound Volume:</label><label><input type="number" id="sSound" min="0" max="100" value="' + Plr.soundVol + '"></label><label>(0-100)</label></div><div class="stTxtInp"><label></label><label>Quick Item Slots:</label><label><input type="number" id="sQISlots" min="1" max="9" value="' + Plr.qiSlots + '"></label><label></label></div><div><label><input type="checkbox" id="sEDNDM"' + (Plr.dnd ? " checked" : "") + '></label><label>Enable Do Not Disturb Mode</label></div><div class="stTxtInp"><label><input type="checkbox" id="sASF"' + (Plr.autoStackFish ? " checked" : "") + '></label><label>Auto Stack Fish</label><label><input type="number" id="sASFMin" min="0" max="100" value="' + Plr.asfMin + '"></label><label>% Minimum (0-100)</label></div><div><label><input type="checkbox" id="sDIC"' + (Plr.noItemComp ? " checked" : "") + '></label><label>Disable Item Compare</label></div><div><label><input type="checkbox" id="sHMA"' + (Plr.hideArrows ? " checked" : "") + '></label><label>Hide Maze Arrows and Whistle Icon</label></div><div><label><input type="checkbox" id="sDarkMode"' + (Plr.dark ? " checked" : "") + '></label><label>Set Town to Night Time</label></div><div><label><input type="checkbox" id="sHideAbort"' + (Plr.hideAbort ? " checked" : "") + '></label><label>Hide Skilling Abort Button</label></div></fieldset><fieldset class="fsLegend"><legend>Vault</legend><div><label><input type="checkbox" id="sEADT"' + (Plr.autoxfer ? " checked" : "") + '></label><label>Enable Auto Deposit/Transfer</label></div></fieldset><fieldset class="fsLegend"><legend>Catacombs</legend><div><label><input type="checkbox" id="sDAHA"' + (Plr.noAHA ? " checked" : "") + '></label><label>Disable Auto Hold Attack</label></div><div><label><input type="checkbox" id="sCWCODGTT"' + (Plr.ctrlDoor ? " checked" : "") + '></label><label>Use Ctrl-Click On Door To Return Town</label></div><div><label><input type="checkbox" id="sECADP"' + (Plr.autoPilot ? " checked" : "") + '></label><label>Enable Catacombs Auto Dummy Pilot</label></div><div><label><input type="checkbox" id="sIALFAG"' + (Plr.lfg ? " checked" : "") + '></label><label>I am looking for a group</label></div></fieldset><div class="tac settingsSave"><button class="abutGradBl" onclick="Settings.save()">Save</button></div></div>'
    },
    k: function(t) {
        t.w;
        var e, s = t.controls, a = [], i = ["Chat Box", "Settings", "Stats", "Groups", "Inventory", "Chat Logs", "Drops", "Proficiencies", "Vault", "Market", "Shrine", "Close All Windows", "Set Attack to Weapon", "Set Attack to Charm", "Set Attack to Accessory Charm", "Engage", "Descend", "Whistle", "Turn Left", "Move Forward", "Turn Right", "Turn Around", "Turn Left 2", "Move Forward 2", "Turn Right 2", "Turn Around 2", "Use Item 1", "Use Item 2", "Use Item 3", "Use Item 4", "Use Item 5", "Use Item 6", "Use Item 7", "Use Item 8", "Use Item 9", "Use Ability 1", "Use Ability 2", "Use Ability 3"];
        for (s.spc = CE("DIV", s, "xpa settingsKeyBox"),
        e = 0; e < i.length; e++)
            a.push({
                e: "div",
                c: [{
                    e: "label",
                    txt: i[e] + ":"
                }, {
                    e: "label",
                    c: [{
                        e: "input",
                        t: "text",
                        v: Settings.getKB(t.keyc[e], t.keys[e]),
                        id: "sHK" + e,
                        ev: [evt.MD, function(t) {
                            this.value = "Press Key..."
                        }
                        , "keyup", function(t) {
                            Settings.setHotkey(t, this)
                        }
                        ]
                    }]
                }]
            });
        mEa(s.spc, a),
        mEa(s, a = [{
            e: "div",
            cl: "tac settingsSave",
            c: [{
                e: "button",
                cl: "abutGradBl",
                txt: "Reset",
                ev: [evt.MC, function(t) {
                    Settings.resetKey(),
                    Gs.updateQuickKeys(),
                    Settings.get().del(),
                    t.stopPropagation()
                }
                ]
            }, {
                txt: " "
            }, {
                e: "button",
                cl: "abutGradBl",
                txt: "Save",
                ev: [evt.MC, function(t) {
                    for (var e = Settings.get(), s = 0; s < e.keys.length; s++)
                        Plr.keymap[s] = e.keys[s],
                        Plr.keycodes[s] = e.keyc[s];
                    Settings.saveKey(),
                    Gs.updateQuickKeys(),
                    e.del(),
                    t.stopPropagation()
                }
                ]
            }]
        }])
    },
    c: function(t) {
        for (var e = Vlt.gc(), s = "", a = 1; a < e.length; a++)
            s += '<div><input type=text id="vCat' + a + '" value="' + e[a] + '" maxlength=13></div>';
        t.controls.innerHTML = '<div class="sVaCa">' + s + '</div><div class="tac settingsSave"><button class="abutGradBl" onclick="Settings.resetV()">Reset</button> <button class="abutGradBl" onclick="Settings.saveV()">Save</button></div></div>'
    },
    saveV: function() {
        Settings.get();
        for (Vlt.uc = ["No Category"],
        i = 1; i < Vlt.c.length; i++)
            Vlt.uc[i] = gi("vCat" + i).value.substring(0, 13);
        localStorage.vc = JSON.stringify(Vlt.uc),
        Settings.get().del()
    },
    resetV: function() {
        Vlt.uc = 0,
        localStorage.removeItem("vc"),
        Settings.get().del()
    },
    setHotkey: function(t, e) {
        e.blur();
        var s = e.id.match(/sHK(\d+)/)[1]
          , a = Settings.get()
          , i = a.keys.indexOf(t.keyCode);
        -1 != i && (a.keys[i] = a.keyc[i] = 0,
        gi("sHK" + i).value = ""),
        a.keys[s] = t.keyCode,
        a.keyc[s] = t.charCode,
        e.value = Settings.getKB(t.charCode, t.keyCode)
    },
    save: function() {
        var t = Settings.get()
          , e = parseInt(gi("sSound").value);
        isNaN(e) || e == Plr.soundVol || Sound.adjVol(e),
        Plr.lfg != gi("sIALFAG").checked && njs.sendBytes(60, 4),
        Plr.dnd != gi("sEDNDM").checked && njs.sendBytes(11, 31),
        localStorage.noAHA = Plr.noAHA = gi("sDAHA").checked ? 1 : 0,
        localStorage.autoPilot = Plr.autoPilot = gi("sECADP").checked ? 1 : 0,
        localStorage.ctrlDoor = Plr.ctrlDoor = gi("sCWCODGTT").checked ? 1 : 0,
        localStorage.noItemComp = Plr.noItemComp = gi("sDIC").checked ? 1 : 0,
        localStorage.hideArrows = Plr.hideArrows = gi("sHMA").checked ? 1 : 0,
        localStorage.dark = Plr.dark = gi("sDarkMode").checked ? 1 : 0,
        0 == bg.bgT && (Plr.dark ? stage.classList.add("darkMode") : stage.classList.remove("darkMode")),
        localStorage.hideAbort = Plr.hideAbort = gi("sHideAbort").checked ? 1 : 0,
        localStorage.autoStackFish = Plr.autoStackFish = gi("sASF").checked ? 1 : 0,
        e = parseInt(gi("sASFMin").value),
        !isNaN(e) && 0 <= e && e <= 100 && (localStorage.asfMin = Plr.asfMin = e),
        Plr.autoPilot && Maze.checkAutoPilot(),
        localStorage.autoxfer = Plr.autoxfer = gi("sEADT").checked ? 1 : 0,
        e = parseInt(gi("sQISlots").value),
        !isNaN(e) && 0 <= e && e <= 9 && e != Plr.qiSlots && (localStorage.qiSlots = Plr.qiSlots = e,
        Settings.saveChar(Plr.char),
        Gs.drawQS()),
        t.del()
    },
    kb: ["", "", "", "CANCEL", "", "", "HELP", "", "BACK_SPACE", "TAB", "", "", "CLEAR", "ENTER", "ENTER_SPECIAL", "", "SHIFT", "CONTROL", "ALT", "PAUSE", "CAPS_LOCK", "KANA", "EISU", "JUNJA", "FINAL", "HANJA", "", "ESCAPE", "CONVERT", "NONCONVERT", "ACCEPT", "MODECHANGE", "SPACE", "PAGE_UP", "PAGE_DOWN", "END", "HOME", "LEFT", "UP", "RIGHT", "DOWN", "SELECT", "PRINT", "EXECUTE", "PRINTSCREEN", "INSERT", "DELETE", "", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "COLON", "SEMICOLON", "LESS_THAN", "EQUALS", "GREATER_THAN", "QUESTION_MARK", "AT", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "OS_KEY", "", "CONTEXT_MENU", "", "SLEEP", "NUMPAD0", "NUMPAD1", "NUMPAD2", "NUMPAD3", "NUMPAD4", "NUMPAD5", "NUMPAD6", "NUMPAD7", "NUMPAD8", "NUMPAD9", "MULTIPLY", "ADD", "SEPARATOR", "SUBTRACT", "DECIMAL", "DIVIDE", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20", "F21", "F22", "F23", "F24", "", "", "", "", "", "", "", "", "NUM_LOCK", "SCROLL_LOCK", "WIN_OEM_FJ_JISHO", "WIN_OEM_FJ_MASSHOU", "WIN_OEM_FJ_TOUROKU", "WIN_OEM_FJ_LOYA", "WIN_OEM_FJ_ROYA", "", "", "", "", "", "", "", "", "", "CIRCUMFLEX", "EXCLAMATION", "DOUBLE_QUOTE", "HASH", "DOLLAR", "PERCENT", "AMPERSAND", "UNDERSCORE", "OPEN_PAREN", "CLOSE_PAREN", "ASTERISK", "PLUS", "PIPE", "HYPHEN_MINUS", "OPEN_CURLY_BRACKET", "CLOSE_CURLY_BRACKET", "TILDE", "", "", "", "", "VOLUME_MUTE", "VOLUME_DOWN", "VOLUME_UP", "", "", "SEMICOLON", "EQUALS", "COMMA", "MINUS", "PERIOD", "SLASH", "BACK_QUOTE", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "OPEN_BRACKET", "BACK_SLASH", "CLOSE_BRACKET", "QUOTE", "", "META", "ALTGR", "", "WIN_ICO_HELP", "WIN_ICO_00", "", "WIN_ICO_CLEAR", "", "", "WIN_OEM_RESET", "WIN_OEM_JUMP", "WIN_OEM_PA1", "WIN_OEM_PA2", "WIN_OEM_PA3", "WIN_OEM_WSCTRL", "WIN_OEM_CUSEL", "WIN_OEM_ATTN", "WIN_OEM_FINISH", "WIN_OEM_COPY", "WIN_OEM_AUTO", "WIN_OEM_ENLW", "WIN_OEM_BACKTAB", "ATTN", "CRSEL", "EXSEL", "EREOF", "PLAY", "ZOOM", "", "PA1", "WIN_OEM_CLEAR", ""],
    getKB: function(t, e) {
        return Settings.kb[e]
    }
}
  , Shrine = {
    get: function() {
        return pops.o[5]
    },
    tog: function() {
        var t = Shrine.get();
        if (t)
            return t.del();
        (t = new Popup(5,-1,-1,"Shrine")).s = CE("div", t.o, "shrineStatsWrap"),
        t.life = new Meter(t.s,0,12,100,13,0," ","lifeMeter"),
        t.mana = new Meter(t.s,0,26,100,13,0," ","manaMeter"),
        Shrine.setStats(),
        t.icon = cS(CE("div", t.o, "statueWrap"), {
            s: "svg/iconStatue.svg",
            w: 180,
            h: 180
        }),
        t.sh = CE("div", t.o, "shrHelp"),
        t.sh.innerHTML = "Drag and drop the Item you wish to sacrifice to the box below.",
        t.item = new ItemSlot(t.sh,{
            ctrlClear: !0,
            params: {
                noDrag: !0
            }
        }),
        CAB({
            p: CE("div", t.sh, ""),
            c: "abutGradBl skBut",
            v: "Sacrifice Item",
            oc: Shrine.sacrifice
        }),
        Inv.setTab(1)
    },
    sacrifice: function() {
        var t = Shrine.get();
        t.item.icon && (t.item.icon.item[7] ? njs.sendData([1, 20, 1, 8, 8, t.item.icon.i]) : Log.add(36))
    },
    clrItem: function(t) {
        var e = Shrine.get();
        e && e.item && e.item.icon && e.item.icon.i == t && e.item.clear()
    },
    setStats: function() {
        var t = Shrine.get();
        t && (t.life.set(Plr.c[22] / Plr.c[20], Plr.c[22] + " / " + Plr.c[20]),
        t.mana.set(Plr.c[23] / Plr.c[21], Plr.c[23] + " / " + Plr.c[21]))
    }
};
function njSock() {
    this.LE = !0,
    this.s = "wss://ladderslasher.d2jsp.org:2083",
    this.recon = 1e3,
    this.connect = function() {
        ws || ((ws = new WebSocket(this.s + "/ls")).binaryType = "arraybuffer",
        ws.onerror = function(t) {
            njs.recon *= 1.5
        }
        ,
        ws.onclose = function(t) {
            ws = 0,
            Plr.stop(),
            Log.add("Disconnected from server. (" + t.code + ")"),
            4e3 <= t.code ? Login.draw() : (njs.reOv || (njs.reOv = CE("div", document.body, "reOv")),
            setTimeout(function() {
                njs.connect()
            }, njs.recon))
        }
        ,
        ws.onopen = function() {
            njs.reOv && (TRC(njs.reOv),
            delete njs.reOv),
            njs.recon = 1e3,
            njs.sendData([1, _VERSION, 8, njs.uid, 100, njs.h])
        }
        ,
        ws.onmessage = function(t) {
            if (t.data instanceof ArrayBuffer) {
                var e, s, a, i, o, r = new DataView(t.data), l = r.getUint8(0);
                switch (l) {
                case 2:
                    Plr.id = r.getUint32(1, njs.LE),
                    Plr.pms = r.getInt16(5, njs.LE),
                    Plr.gold = r.getFloat64(7, njs.LE),
                    Plr.lfg = 1,
                    CS.getList();
                    break;
                case 3:
                    switch (r.getInt8(1)) {
                    case 1:
                        CS.show();
                        break;
                    case 2:
                        CS.doRename();
                        break;
                    case 3:
                        Gs.load();
                        break;
                    case 4:
                        CS.show();
                        break;
                    case 5:
                        MQ.stairs(r.getInt8(2), r.getUint8(3));
                        break;
                    case 6:
                        Cata.gotoTown();
                        break;
                    case 90:
                    case 91:
                        Ladder.fin();
                        break;
                    default:
                        njs._dumpData(r)
                    }
                    break;
                case 4:
                    a = r.getUint32(1, njs.LE),
                    Plr.chars[a] = [a, Plr.id],
                    njs.readData(r, 5, [100, 1, 1, 1, 2, 2, 2, 8, 8, 8, 3, 3, 1, 8, 3, 3, 3, 3, 7, 7, 7, 7, 1, 8, 8, 8, 8, 1, 1, 8], Plr.chars[a]);
                    break;
                case 5:
                    for (a = r.getUint32(1, njs.LE),
                    CS.select(a),
                    e = 0,
                    i = 5; e < 3; e++)
                        for (Plr.chars[a][52 + e] = [],
                        o = r.getUint8(i++),
                        s = 0; s < o; s++)
                            Plr.chars[a][52 + e][r.getUint8(i++)] = [r.getUint8(i++), r.getUint32(i, njs.LE)],
                            i += 4;
                    break;
                case 6:
                    switch (a = r.getInt8(1)) {
                    case 0:
                        i = Items.add(Plr.items, a, r),
                        Inv.addItem(i);
                        break;
                    case 1:
                        Mkt.addItem(Items.add(Mkt.I, a, r));
                        break;
                    case 2:
                        Gs.addGlyph(Items.add(Plr.glyphs, a, r));
                        break;
                    case 3:
                        Vlt.addItem(a, r);
                        break;
                    case 4:
                        Drops.add(a, r);
                        break;
                    case 5:
                        Plr.maps = {},
                        useMap(Items.add(Plr.maps, a, r));
                        break;
                    default:
                        njs._dumpData(r)
                    }
                    break;
                case 7:
                    switch (a = r.getInt8(1),
                    i = r.getInt8(2),
                    a) {
                    case 1:
                        MQ.doKey(i);
                        break;
                    case 2:
                        Plr.gEB = i
                    }
                    break;
                case 10:
                    Log.add(r.getUint8(1));
                    break;
                case 11:
                    switch (a = r.getInt8(1)) {
                    case 0:
                        Log.add(njs.readUTFBytes(t.data, 3, r.getUint8(2)));
                        break;
                    case 1:
                        Log.addWho(njs.readData(r, 2, [2, 2, 2, 8, 100, 100, 100]));
                        break;
                    case 3:
                        o = njs.readData(r, 2, [100, 100]),
                        Log.addChat(o[0], o[1], 1);
                        break;
                    case 10:
                        o = njs.readData(r, 2, [100, 100]),
                        Log.addChat(o[0], o[1], 2);
                        break;
                    case 11:
                        o = njs.readData(r, 2, [100, 100]),
                        Log.addChat(o[0], o[1], 3);
                        break;
                    case 20:
                        Log.addMQ(njs.readData(r, 2, [2, 2, 100, 100, 100]))
                    }
                    break;
                case 13:
                    Plr.setItemBaseStats(r, r.getUint32(1, njs.LE));
                    break;
                case 14:
                    Plr.setItemBonusStats(r, r.getUint32(1, njs.LE));
                    break;
                case 15:
                    Plr.setStats(r, !0);
                    break;
                case 16:
                    Plr.setStats(r, !1);
                    break;
                case 17:
                    Cbt.setNPCStats(r, !0);
                    break;
                case 18:
                    Cbt.setNPCStats(r, !1);
                    break;
                case 19:
                    Prof.addPoints(r.getInt8(1), r.getInt8(2), r.getInt16(3, njs.LE));
                    break;
                case 20:
                    switch (a = r.getInt8(1),
                    i = r.getUint32(2, njs.LE),
                    a) {
                    case 1:
                        Drops.getItem(i, r.getUint32(6, njs.LE));
                        break;
                    case 2:
                        Inv.delItem(i);
                        break;
                    case 3:
                        Plr.equipItem(i);
                        break;
                    case 4:
                        Plr.equipAccessory(i);
                        break;
                    case 5:
                        Plr.unequipItem(i);
                        break;
                    case 6:
                        Drops.doDelItem(i, r.getUint32(6, njs.LE));
                        break;
                    case 10:
                        Vlt.delItem(i);
                        break;
                    case 15:
                        Gs.removeGlyph(i)
                    }
                    break;
                case 25:
                    switch (a = r.getInt8(1)) {
                    case 1:
                        Vlt.data = [r.getInt16(2, njs.LE), r.getInt16(4, njs.LE), r.getUint32(6, njs.LE), r.getUint8(10), r.getFloat64(15, njs.LE), r.getUint16(11, njs.LE), r.getUint16(13, njs.LE)],
                        Vlt.setStats();
                        break;
                    case 2:
                        Vlt.setGuildStats(r.getUint32(2, njs.LE), r.getUint32(6, njs.LE));
                        break;
                    case 4:
                        Vlt.getItem(r.getUint32(2, njs.LE), r.getUint32(6, njs.LE));
                        break;
                    case 9:
                        console.log("received vault item"),
                        Vlt.itemRx(njs.readData(r, 2, [8, 2, 2, 2, 2, 100]));
                        break;
                    case 11:
                        Vlt.finishSearch(r.getInt16(2, njs.LE))
                    }
                    break;
                case 30:
                    switch (a = r.getInt8(1)) {
                    case 1:
                        Mkt.getItem(r.getUint32(2, njs.LE), r.getUint32(6, njs.LE));
                        break;
                    case 3:
                        Mkt.delItem(r.getUint32(2, njs.LE));
                        break;
                    case 8:
                        Mkt.finish();
                        break;
                    case 9:
                        Mkt.itemSold(njs.readData(r, 2, [8, 16, 2, 2, 2, 2]))
                    }
                    break;
                case 40:
                    switch (a = r.getInt8(1)) {
                    case 0:
                        Plr.setAbilities(r);
                        break;
                    case 1:
                        Gs.setAbilityCharge(r)
                    }
                    break;
                case 50:
                    0 == (a = r.getInt8(1)) || 1 == a ? Skill.proc(a, njs.readData(r, 2, [2, 2, 2])) : 2 == a || 3 == a ? Skill.proc(a, njs.readData(r, 2, [8, 4, 4])) : Skill.proc(a);
                    break;
                case 60:
                    Grp.addGrp(njs.readData(r, 1, [8, 1, 2, 1, 1, 2, 100, 100]));
                    break;
                case 61:
                    Plr.setGroupData(...njs.readData(r, 1, [2, 2, 8, 100]));
                    break;
                case 62:
                    Plr.g.join(njs.readData(r, 1, [8, 1, 2, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 100, 100]));
                    break;
                case 63:
                    Plr.g.leave(r.getUint32(1, njs.LE));
                    break;
                case 64:
                    a = r.getUint8(7),
                    i = r.getUint8(8 + a),
                    Grp.addPlr(r.getUint32(1, njs.LE), r.getUint8(5), r.getUint8(6), njs.readUTFBytes(t.data, 8, a), njs.readUTFBytes(t.data, 9 + a, i));
                    break;
                case 65:
                    1 == (a = r.getUint8(1)) ? (i = Skill.get()) && i.started ? i.refreshGroups = !0 : Grp.refresh() : 2 == a && Grp.listDone(r.getUint8(2));
                    break;
                case 70:
                    Cata.enter(r.getInt8(1), r.getInt8(2));
                    break;
                case 71:
                    Maze.getRoom(r.getInt16(1, njs.LE), r.getInt16(3, njs.LE), r.getUint8(5), r.getUint8(6));
                    break;
                case 72:
                    Plr.g.updateObjectives(r.getInt8(1), r.getUint32(2, njs.LE));
                    break;
                case 73:
                    Cbt.start(r.getInt8(1));
                    break;
                case 77:
                    Maze.getRow(r, r.getInt16(1, njs.LE), r.getInt16(3, njs.LE));
                    break;
                case 78:
                    Maze.setDir(r.getUint8(1));
                    break;
                case 80:
                    Cbt.addNewMob([r.getInt8(1), r.getInt8(2), r.getInt8(3), r.getInt8(4), r.getInt8(5), njs.readUTFBytes(t.data, 7, r.getUint8(6))]);
                    break;
                case 81:
                case 82:
                case 83:
                case 84:
                    Cbt.doAttack(l - 81, r.getUint32(1, njs.LE), r.getUint32(5, njs.LE), r.getInt32(9, njs.LE), r.getInt8(13), r.getUint8(14));
                    break;
                case 85:
                    Cbt.remMob(r.getUint32(1, njs.LE));
                    break;
                case 86:
                    a = r.getUint8(9),
                    i = r.getUint8(10 + a),
                    Cbt.addNewMob([r.getUint32(1, njs.LE), r.getInt8(5), r.getInt8(6), r.getInt8(7), r.getInt8(8), njs.readUTFBytes(t.data, 10, a), njs.readUTFBytes(t.data, 10 + a, i), r.getInt8(11 + a + i), r.getInt8(12 + a + i)]);
                    break;
                case 90:
                    a = r.getUint8(9),
                    i = r.getUint8(10 + a),
                    Ladder.expRank([r.getUint8(1), r.getUint32(2, njs.LE), r.getInt8(6), r.getInt8(7), r.getInt8(8), njs.readUTFBytes(t.data, 10, a), njs.readUTFBytes(t.data, 11 + a, i)]);
                    break;
                case 91:
                    a = r.getUint8(6),
                    i = r.getUint8(7 + a),
                    Ladder.profRank([r.getUint32(1, njs.LE), r.getUint8(5), njs.readUTFBytes(t.data, 7, a), njs.readUTFBytes(t.data, 8 + a, i)]);
                    break;
                case 250:
                    njs.sendBytes(250, r.getInt8(1));
                    break;
                default:
                    njs._dumpData(r)
                }
            }
        }
        )
    }
    ,
    this._dumpData = function(t) {
        var e = "";
        for (i = 0; i < t.byteLength; i++)
            e += t.getUint8(i) + " ";
        console.log(e)
    }
    ,
    this.getUint24 = function(t, e) {
        return njs.LE ? t.getUint8(e) + (t.getUint8(e + 1) << 8) + (t.getUint8(e + 2) << 16) : t.getUint8(e + 2) + (t.getUint8(e + 1) << 8) + (t.getUint8(e) << 16)
    }
    ,
    this.readUTFBytes = function(t, e, s) {
        t = new Uint8Array(t,e,s);
        return decodeURIComponent(escape(String.fromCharCode.apply(null, t)))
    }
    ,
    this.sendBytes = function() {
        for (var t = new ArrayBuffer(arguments.length), e = new Uint8Array(t,0,arguments.length), s = 0; s < arguments.length; s++)
            e[s] = arguments[s];
        ws.send(t)
    }
    ,
    this.sendData = function(t) {
        for (var e = 0, s = 0, a = 0; a < t.length; a += 2)
            100 == t[a] ? s += t[a + 1].length + 1 : s += Math.ceil(t[a] / 2);
        var i = new ArrayBuffer(s)
          , o = new DataView(i,0);
        for (a = 0; a < t.length; a += 2)
            switch (t[a]) {
            case 1:
                o.setInt8(e++, t[a + 1]);
                break;
            case 2:
                o.setUint8(e++, t[a + 1]);
                break;
            case 3:
                o.setInt16(e, t[a + 1], njs.LE),
                e += 2;
                break;
            case 4:
                o.setUint16(e, t[a + 1], njs.LE),
                e += 2;
                break;
            case 7:
                o.setInt32(e, t[a + 1], njs.LE),
                e += 4;
                break;
            case 8:
                o.setUint32(e, t[a + 1], njs.LE),
                e += 4;
                break;
            case 16:
                o.setFloat64(e, t[a + 1], njs.LE),
                e += 8;
                break;
            case 100:
                e = as2dv(o, t[a + 1], e)
            }
        ws.send(i)
    }
    ,
    this.readData = function(t, e, s, a) {
        var i, o, r, l;
        for (a = a || [],
        i = 0; i < s.length; i++)
            switch (s[i]) {
            case 1:
                a.push(t.getInt8(e++));
                break;
            case 2:
                a.push(t.getUint8(e++));
                break;
            case 3:
                a.push(t.getInt16(e, njs.LE)),
                e += 2;
                break;
            case 4:
                a.push(t.getUint16(e, njs.LE)),
                e += 2;
                break;
            case 7:
                a.push(t.getInt32(e, njs.LE)),
                e += 4;
                break;
            case 8:
                a.push(t.getUint32(e, njs.LE)),
                e += 4;
                break;
            case 16:
                a.push(t.getFloat64(e, njs.LE)),
                e += 8;
                break;
            case 100:
                for (l = t.getUint8(e++),
                r = [],
                o = 0; o < l; o++)
                    r.push(t.getUint8(e++));
                a.push(String.fromCharCode.apply(null, r))
            }
        return a
    }
}
function as2dv(t, e, s) {
    t.setUint8(s++, e.length);
    for (var a = 0; a < e.length; a++)
        t.setUint8(s++, e.charCodeAt(a));
    return s
}
var Sound = {
    _snds: [],
    load: function() {
        if (!Sound.loaded()) {
            Log.add("Loading sounds.");
            var t = ["level.mp3", "heal2.mp3", "swing1.mp3", "swing2.mp3", "hit1.mp3", "hit2.mp3", "profup.mp3", "item.mp3"];
            try {
                for (var e = 0; e < t.length; e++)
                    Sound._snds[e] = new Audio("https://ladderslasher.d2jsp.org/swf/" + t[e])
            } catch (t) {
                Plr.soundVol = 0
            }
        }
    },
    loaded: function() {
        return Sound._snds.length
    },
    play: function(t) {
        Plr.soundVol && Sound._snds[t] && (Sound._snds[t].volume = Plr.soundVol / 100,
        Sound._snds[t].play())
    },
    item: function() {
        Sound.play(7)
    },
    adjVol: function(t) {
        isNaN(t) || t < 0 || 100 < t || (Plr.isM ? Plr.soundVol = 0 : (Plr.soundVol = t,
        Sound.load(),
        Log.add("Sound volume set to " + (Plr.soundVol || "Muted") + ". To toggle, type /sound"),
        localStorage.soundVol = Plr.soundVol))
    }
}
  , Stats = {
    get: function() {
        return pops.o[0]
    },
    tog: function() {
        var t = Stats.get();
        if (t)
            return t.del();
        var e, s, a = CE("div", (t = new Popup(0,-1,-1,"")).o), i = (a.innerHTML = '<div class="njRBWrap statTabs"><div class="njRB sel">Player Stats</div><div class="njRB" id="CSOB">Objectives</div></div>    <div><fieldset class="fsLegend"><legend>' + Plr.c[2] + '</legend><div class="cStats">    <div>Class:</div>    <div>' + CStats.classData[Plr.c[5]][0] + '</div>\t<div>Level:</div>    <div id="CS0"></div></div><div class="cStats">\t<div>Experience:</div>\t<div id="CS1"></div>\t<div>Next:</div>\t<div id="CS2"></div></div></fieldset><fieldset class="fsLegend"><legend></legend><div class="cStats">    <div>Strength:</div>    <div id="CS3"></div>    <div>MQ Pass/Total:</div>    <div>' + Plr.c[14] + " / " + Plr.c[12] + '</div></div><div class="cStats">    <div>Dexterity:</div>    <div id="CS4"></div>    <div>Kills:</div>    <div id="CS9"></div></div><div class="cStats">    <div>Intelligence:</div>    <div id="CS5"></div>    <div>Death:</div>    <div id="CS10"></div></div><div class="cStats">    <div>Vitality:</div>    <div id="CS6"></div>    <div id="CWL"></div>    <div id="CS11"></div></div><div class="cStats">    <div>Stat Points:</div>    <div id="CS7"></div>    <div>Physical Def:</div>    <div id="CS12"></div></div><div class="cStats">    <div>Ability Points:</div>    <div id="CS8"></div>    <div>Magical Def:</div>    <div id="CS13"></div></div></fieldset><fieldset class="fsLegend"><legend></legend><div class="cAbW">\t<div class="cAbL">\t\t<div class="cAbs">\t\t\t<div>Weapon Abilities</div>\t\t\t<div id="sWAbs"></div>\t\t</div>\t\t<div class="cAbs">\t\t\t<div>Cast Abilities</div>\t\t\t<div id="sCAbs"></div>\t\t</div>\t</div>\t<div class="cAbR">\t\tAbility<br>Hot Keys\t\t<div id="abHKs"></div>\t</div></div></fieldset>',
        gi("sWAbs")), o = gi("sCAbs");
        for (t.abIcons = [],
        s = 1; s < Abilities.data.length; s++)
            e = Abilities.data[s][2],
            t.abIcons[s] = new AI(e ? o : i,s);
        for (t.abObjs = new Array(3),
        s = 0; s < 3; s++)
            t.abObjs[s] = new AHK(gi("abHKs"),s,Plr.cd.ab[s]);
        aE(a = gi("CSOB"), "mouseover", Stats.ovObj),
        aE(a, "mouseout", Stats.ouObj),
        Stats.set()
    },
    set: function() {
        if (Stats.get()) {
            var t, e, s, a, i = [Plr.c[6], Plr.c[9], 1e6 * Plr.c[6], Plr.c[16], Plr.c[17], Plr.c[19], Plr.c[18], Plr.c[7], Plr.c[8], Plr.c[10], Plr.c[11], "", "", ""], o = "Damage:";
            switch (Plr.c[26] && (e = Plr.items[Plr.c[26]],
            t = Items.getEffectRange(e),
            i[12] = t[0] + " to " + t[1],
            i[13] = t[2] + " to " + t[3]),
            Gs.selAtk) {
            case e = 0:
                e = Plr.items[Plr.c[25]];
                break;
            case 1:
                e = Plr.items[Plr.c[27]];
                break;
            case 2:
                e = Plr.items[Plr.c[28]]
            }
            for (e && (t = Items.getEffectRange(e),
            i[11] = t[0] + " to " + t[1],
            Items.isHealCharm(e)) && (o = "Heals:"),
            gi("CWL").innerHTML = o,
            a = 0; a < i.length; a++)
                gi("CS" + a).innerHTML = i[a];
            if (i[7])
                for (a = 0; a < 4; a++)
                    (s = mSVG(gi("CS" + (a + 3)), {
                        n: svgs.plus
                    })).i = a,
                    aE(s, evt.MD, Stats.clkStat)
        }
    },
    clkStat: function(t) {
        var e = [15, this.i];
        t.ctrlKey && e.push(5),
        njs.sendBytes(...e)
    },
    exp: function() {
        Stats.get() && (gi("CS1").innerHTML = Plr.c[9])
    },
    ovObj: function(t) {
        var e, s = gi("CSOB"), a = Stats.get();
        if (!a.tip) {
            if (a.tip = new Tip(s,t),
            a.tip.add("Objectives Completed:", "fcb fwb"),
            Plr.c[31])
                for (e = 0; e < Group.objectives.length; e++)
                    1 << e & Plr.c[31] && a.tip.add(Group.objectives[e], "fcb");
            else
                a.tip.add("None", "fcGray");
            if (Plr.g)
                if (a.tip.add("Objectives Enabled:", "fcb fwb"),
                Plr.g.objectives)
                    for (e = 0; e < Group.objectives.length; e++)
                        1 << e & Plr.g.objectives && a.tip.add(Group.objectives[e], "fcGray2");
                else
                    a.tip.add("None", "fcGray");
            a.tip.finish()
        }
    },
    ouObj: function(t) {
        var e = Stats.get();
        e && e.tip && (e.tip = e.tip.del())
    }
}
  , svgs = {
    ab1: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M6 14l4 4 4-4H6m12-3.1V5.6H2v5.3h16M0 0h20v20H0V0"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M18 10.9H2V5.6h16v5.3M6 14h8l-4 4-4-4"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M18 10.9H2V5.6h16v5.3M6 14h8l-4 4-4-4"
    }]],
    ab2: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M14 14v4h4v-4h-4M2 14v4h4v-4H2m6 0v4h4v-4H8m2-12L6 6h8l-4-4m10-2v20H0V0h20"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M10 2l4 4H6l4-4M8 14h4v4H8v-4m-6 0h4v4H2v-4m12 0h4v4h-4v-4"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M10 2l4 4H6l4-4M8 14h4v4H8v-4m-6 0h4v4H2v-4m12 0h4v4h-4v-4"
    }]],
    ab3: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M18 6V2h-4v4h4m-6 0V2H8v4h4M6 6V2H2v4h4m8.5 5h-3V8h-3v3h-3v3h3v3h3v-3h3v-3M0 20V0h20v20H0"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M18 6h-4V2h4v4m-3.5 5v3h-3v3h-3v-3h-3v-3h3V8h3v3h3M6 6H2V2h4v4M8 6V2h4v4H8"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M18 6h-4V2h4v4m-3.5 5v3h-3v3h-3v-3h-3v-3h3V8h3v3h3M6 6H2V2h4v4M8 6V2h4v4H8"
    }]],
    ab4: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#ABA9A8",
        d: "M12 12H8V8h4v4m2-4h4v4h-4V8M2 8h4v4H2V8m8 10l-4-4h8l-4 4"
    }, {
        _t: "path",
        fill: "#E3E3E3",
        d: "M10 18l4-4H6l4 4M2 8v4h4V8H2m12 0v4h4V8h-4m-2 4V8H8v4h4m8-12v20H0V0h20"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M12 12H8V8h4v4m2-4h4v4h-4V8M2 8h4v4H2V8M14 14H6l4 4 4-4"
    }]],
    ab5: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M2 2v16h16V2H2M0 20V0h20v20H0"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M10 12L6 8h8l-4 4"
    }, {
        _t: "path",
        fill: "#cccccc",
        d: "M10 12l4-4H6l4 4M2 2h16v16H2V2"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#cccccc",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M2 2h16v16H2V2"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M14 8H6l4 4 4-4"
    }]],
    ab6: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M12.65 4.65V2H7.3v5.3H2l.05.05L2 7.3h5.3v.05H2v5.35h5.3V18h5.35v-5.3H18V7.35h-.05L18 7.3h-5.3H18l-.05.05h-5.3V4.65l.05 2.65v.05-.05l-.05-2.65m0 2.65h.05-.05M20 20H0V0h20v20"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M12.7 12.7H7.4l-.1-.1.1.1h-.1V7.3h5.35v.05h.05v5.35m0-.1l-.1.1.1-.1"
    }, {
        _t: "path",
        fill: "#cccccc",
        d: "M12.7 12.6l5.25-5.25-5.25 5.25V7.35H18v5.35h-5.3v-.1M7.3 7.3V2h5.35v5.3H7.3m5.35 5.4V18H7.3v-5.3H2V7.35h5.3v5.35h5.3L10 15.3l-2.6-2.6 2.6 2.6 2.6-2.6h.05M2.05 7.35L7.3 12.6 2.05 7.35"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M12.7 7.3H18l-.05.05-5.25 5.25v.1h-.05M2.05 7.35L2 7.3H12.65m0 .05h.05m0-.05h-.05m-5.35.05V7.3m0 .05v5.25l.1.1h5.2l.1-.1V7.35M7.4 12.7l2.6 2.6 2.6-2.6h.05m-5.35 0v-.1L2.05 7.35M7.4 12.7h-.1"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#cccccc",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M7.3 12.7H2V7.35h2.65M7.3 7.3V2h5.35v2.65l.05 2.65m5.25.05H18v5.35h-5.3m-.05 0V18H7.3v-5.3m5.4-5.35V7.3m0 .05h5.25"
    }]],
    ab7: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M8 6v8l4-4-4-4m6 12h4v-4h-4v4m0-6h4V8h-4v4m0-6h4V2h-4v4M0 0h20v20H0V0"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M14 6V2h4v4h-4m0 6V8h4v4h-4m0 6v-4h4v4h-4M8 6l4 4-4 4V6"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M14 6V2h4v4h-4m0 6V8h4v4h-4m0 6v-4h4v4h-4M8 6l4 4-4 4V6"
    }]],
    ab8: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M6 4q0-.85-.6-1.45Q4.85 2 4 2q-.8 0-1.4.55Q2 3.15 2 4t.6 1.4Q3.2 6 4 6q.85 0 1.4-.6Q6 4.85 6 4m5.4 1.4q.6-.55.6-1.4 0-.85-.6-1.45Q10.85 2 10 2q-.8 0-1.4.55Q8 3.15 8 4t.6 1.4q.6.6 1.4.6.85 0 1.4-.6m6 0q.6-.55.6-1.4 0-.85-.6-1.45Q16.85 2 16 2q-.8 0-1.4.55-.6.6-.6 1.45t.6 1.4q.6.6 1.4.6.85 0 1.4-.6M20 0v20H0V0h20"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M17.4 5.4q-.55.6-1.4.6-.8 0-1.4-.6Q14 4.85 14 4q0-.85.6-1.45Q15.2 2 16 2q.85 0 1.4.55.6.6.6 1.45t-.6 1.4m-6 0q-.55.6-1.4.6-.8 0-1.4-.6Q8 4.85 8 4q0-.85.6-1.45Q9.2 2 10 2q.85 0 1.4.55.6.6.6 1.45t-.6 1.4M6 4q0 .85-.6 1.4Q4.85 6 4 6q-.8 0-1.4-.6Q2 4.85 2 4q0-.85.6-1.45Q3.2 2 4 2q.85 0 1.4.55.6.6.6 1.45"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M17.4 5.4q-.55.6-1.4.6-.8 0-1.4-.6Q14 4.85 14 4q0-.85.6-1.45Q15.2 2 16 2q.85 0 1.4.55.6.6.6 1.45t-.6 1.4m-6 0q-.55.6-1.4.6-.8 0-1.4-.6Q8 4.85 8 4q0-.85.6-1.45Q9.2 2 10 2q.85 0 1.4.55.6.6.6 1.45t-.6 1.4M6 4q0 .85-.6 1.4Q4.85 6 4 6q-.8 0-1.4-.6Q2 4.85 2 4q0-.85.6-1.45Q3.2 2 4 2q.85 0 1.4.55.6.6.6 1.45M10.7 9l-1.2.75Q9 10.25 9 11q0 .7.4 1.3l.5.55 1 .55q.6.45.7 1.4.1.85-.6 1.45-.6.6-1.45.55"
    }]],
    ab9: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#ABA9A8",
        d: "M12.7 17.6l-2.55.4H9.8l-2.4-.4V2.4L9.8 2h.35l2.55.45V17.6"
    }, {
        _t: "path",
        fill: "#cccccc",
        d: "M12.7 17.6V2.45q1.65.55 3 1.85 2.25 2.35 2.3 5.5v.4q-.05 3.2-2.3 5.45-1.35 1.35-3 1.95"
    }, {
        _t: "path",
        fill: "#E3E3E3",
        d: "M12.7 17.6q1.65-.6 3-1.95 2.25-2.25 2.3-5.45v-.4q-.05-3.15-2.3-5.5-1.35-1.3-3-1.85L10.15 2H9.8l-2.4.4v15.2l2.4.4h.35l2.55-.4M7.4 2.4q-1.7.55-3.05 1.9Q2.05 6.65 2 9.8v.4q.05 3.2 2.35 5.45Q5.7 17 7.4 17.6q-1.7-.6-3.05-1.95Q2.05 13.4 2 10.2v-.4q.05-3.15 2.35-5.5Q5.7 2.95 7.4 2.4M0 0h20v20H0V0"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M7.4 2.4v15.2"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#cccccc",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M7.4 17.6q-1.7-.6-3.05-1.95Q2.05 13.4 2 10.2v-.4q.05-3.15 2.35-5.5Q5.7 2.95 7.4 2.4L9.8 2h.35l2.55.45V17.6l-2.55.4H9.8l-2.4-.4m5.3-15.15q1.65.55 3 1.85 2.25 2.35 2.3 5.5v.4q-.05 3.2-2.3 5.45-1.35 1.35-3 1.95"
    }]],
    ab10: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M6 5.05q-.05-.85.55-1.45.6-.7 1.45-.6.95.1 1.4.7l.55 1 .55.5q.6.4 1.3.4.75 0 1.25-.5l.75-1.2-.75 1.2q-.5.5-1.25.5-.7 0-1.3-.4l-.55-.5-.55-1Q8.95 3.1 8 3q-.85-.1-1.45.6-.6.6-.55 1.45M4 8q-.8 0-1.4.55Q2 9.15 2 10t.6 1.4q.6.6 1.4.6.85 0 1.4-.6.6-.55.6-1.4 0-.85-.6-1.45Q4.85 8 4 8m8 2q0-.85-.6-1.45Q10.85 8 10 8q-.8 0-1.4.55Q8 9.15 8 10t.6 1.4q.6.6 1.4.6.85 0 1.4-.6.6-.55.6-1.4m2 0q0 .85.6 1.4.6.6 1.4.6.85 0 1.4-.6.6-.55.6-1.4 0-.85-.6-1.45Q16.85 8 16 8q-.8 0-1.4.55-.6.6-.6 1.45M0 0h20v20H0V0"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M14 10q0-.85.6-1.45Q15.2 8 16 8q.85 0 1.4.55.6.6.6 1.45t-.6 1.4q-.55.6-1.4.6-.8 0-1.4-.6-.6-.55-.6-1.4m-2 0q0 .85-.6 1.4-.55.6-1.4.6-.8 0-1.4-.6Q8 10.85 8 10q0-.85.6-1.45Q9.2 8 10 8q.85 0 1.4.55.6.6.6 1.45M4 8q.85 0 1.4.55.6.6.6 1.45t-.6 1.4q-.55.6-1.4.6-.8 0-1.4-.6Q2 10.85 2 10q0-.85.6-1.45Q3.2 8 4 8"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M13.8 3.9l-.75 1.2q-.5.5-1.25.5-.7 0-1.3-.4l-.55-.5-.55-1Q8.95 3.1 8 3q-.85-.1-1.45.6-.6.6-.55 1.45M14 10q0-.85.6-1.45Q15.2 8 16 8q.85 0 1.4.55.6.6.6 1.45t-.6 1.4q-.55.6-1.4.6-.8 0-1.4-.6-.6-.55-.6-1.4m-2 0q0 .85-.6 1.4-.55.6-1.4.6-.8 0-1.4-.6Q8 10.85 8 10q0-.85.6-1.45Q9.2 8 10 8q.85 0 1.4.55.6.6.6 1.45M4 8q.85 0 1.4.55.6.6.6 1.45t-.6 1.4q-.55.6-1.4.6-.8 0-1.4-.6Q2 10.85 2 10q0-.85.6-1.45Q3.2 8 4 8"
    }]],
    ab11: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M20 0v20H0V0h20m-4.4 4.2l-1.4-1.1Q12.45 2 10.1 2h-.15q-2.3 0-4.1 1.15L4.4 4.2q-.75.75-1.25 1.6Q2 7.65 2 10q0 3.4 2.4 5.6Q6.8 18 10 18q3.4 0 5.6-2.4Q18 13.4 18 10q0-2.35-1.1-4.2l-1.3-1.6"
    }, {
        _t: "path",
        fill: "#cccccc",
        d: "M15.6 4.2l1.3 1.6Q18 7.65 18 10q0 3.4-2.4 5.6Q13.4 18 10 18q-3.2 0-5.6-2.4Q2 13.4 2 10q0-2.35 1.15-4.2.5-.85 1.25-1.6l1.45-1.05Q7.65 2 9.95 2h.15q2.35 0 4.1 1.1l1.4 1.1m-6.05 9.6q.85.05 1.45-.55.7-.6.6-1.45-.1-.95-.7-1.4l-1-.55-.5-.55Q9 8.7 9 8q0-.75.5-1.25l1.2-.85-1.2.85Q9 7.25 9 8q0 .7.4 1.3l.5.55 1 .55q.6.45.7 1.4.1.85-.6 1.45-.6.6-1.45.55"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#cccccc",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M15.6 4.2l1.3 1.6Q18 7.65 18 10q0 3.4-2.4 5.6Q13.4 18 10 18q-3.2 0-5.6-2.4Q2 13.4 2 10q0-2.35 1.15-4.2.5-.85 1.25-1.6l1.45-1.05Q7.65 2 9.95 2h.15q2.35 0 4.1 1.1l1.4 1.1"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M10.7 5.9l-1.2.85Q9 7.25 9 8q0 .7.4 1.3l.5.55 1 .55q.6.45.7 1.4.1.85-.6 1.45-.6.6-1.45.55"
    }]],
    ab12: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M11.4 11.4q.6-.55.6-1.4 0-.85-.6-1.45Q10.85 8 10 8q-.8 0-1.4.55Q8 9.15 8 10t.6 1.4q.6.6 1.4.6l.7-.1.7-.5M12 4q0-.85-.6-1.45Q10.85 2 10 2q-.8 0-1.4.55Q8 3.15 8 4t.6 1.4q.6.6 1.4.6.85 0 1.4-.6.6-.55.6-1.4M3.55 14q.85.05 1.45-.55.7-.6.6-1.45-.1-.95-.7-1.4l-1-.55-.5-.55Q3 8.9 3 8.2q0-.75.5-1.25L4.7 5.9 3.5 6.95Q3 7.45 3 8.2q0 .7.4 1.3l.5.55 1 .55q.6.45.7 1.4.1.85-.6 1.45-.6.6-1.45.55m11 0q.85.05 1.45-.55.7-.6.6-1.45-.1-.95-.7-1.4l-1-.55-.5-.55q-.4-.6-.4-1.3 0-.75.5-1.25L15.75 6l-1.25.95q-.5.5-.5 1.25 0 .7.4 1.3l.5.55 1 .55q.6.45.7 1.4.1.85-.6 1.45-.6.6-1.45.55M8.6 17.4q.6.6 1.4.6.85 0 1.4-.6.6-.55.6-1.4 0-.85-.6-1.45Q10.85 14 10 14q-.8 0-1.4.55-.6.6-.6 1.45t.6 1.4M0 0h20v20H0V0"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M12 4q0 .85-.6 1.4-.55.6-1.4.6-.8 0-1.4-.6Q8 4.85 8 4q0-.85.6-1.45Q9.2 2 10 2q.85 0 1.4.55.6.6.6 1.45m-.6 7.4l-.7.5-.7.1q-.8 0-1.4-.6Q8 10.85 8 10q0-.85.6-1.45Q9.2 8 10 8q.85 0 1.4.55.6.6.6 1.45t-.6 1.4m-2.8 6Q8 16.85 8 16q0-.85.6-1.45Q9.2 14 10 14q.85 0 1.4.55.6.6.6 1.45t-.6 1.4q-.55.6-1.4.6-.8 0-1.4-.6"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M12 4q0 .85-.6 1.4-.55.6-1.4.6-.8 0-1.4-.6Q8 4.85 8 4q0-.85.6-1.45Q9.2 2 10 2q.85 0 1.4.55.6.6.6 1.45m-.6 7.4l-.7.5-.7.1q-.8 0-1.4-.6Q8 10.85 8 10q0-.85.6-1.45Q9.2 8 10 8q.85 0 1.4.55.6.6.6 1.45t-.6 1.4M15.75 6l-1.25.95q-.5.5-.5 1.25 0 .7.4 1.3l.5.55 1 .55q.6.45.7 1.4.1.85-.6 1.45-.6.6-1.45.55M4.7 5.9L3.5 6.95Q3 7.45 3 8.2q0 .7.4 1.3l.5.55 1 .55q.6.45.7 1.4.1.85-.6 1.45-.6.6-1.45.55m5.05 3.4Q8 16.85 8 16q0-.85.6-1.45Q9.2 14 10 14q.85 0 1.4.55.6.6.6 1.45t-.6 1.4q-.55.6-1.4.6-.8 0-1.4-.6"
    }]],
    ab13: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M11 4.05V2H9v2.05H7V6h2v3.05H6V7H4v2.05H2V11h2v2h2v-2h3v3.05H7V16h2v2h2v-2h2v-1.95h-2V11h3v2h2v-2h2V9.05h-2V7h-2v2.05h-3V6h2V4.05h-2M20 20H0V0h20v20"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M11 4.05h2V6h-2v3.05h3V7h2v2.05h2V11h-2v2h-2v-2h-3v3.05h2V16h-2v2H9v-2H7v-1.95h2V11H6v2H4v-2H2V9.05h2V7h2v2.05h3V6H7V4.05h2V2h2v2.05"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M11 4.05V2H9v2.05H7V6h2v3.05H6V7H4v2.05H2V11h2v2h2v-2h3v3.05H7V16h2v2h2v-2h2v-1.95h-2V11h3v2h2v-2h2V9.05h-2V7h-2v2.05h-3V6h2V4.05h-2"
    }]],
    ab14: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M20 0v20H0V0h20M2 2v16h16V2H2"
    }, {
        _t: "path",
        fill: "#cccccc",
        d: "M2 2h16v16H2V2m13 9.65v-3.3h-3.3V5H8.35v3.35H5v3.3h3.35V15h3.35v-3.35H15"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M15 11.65h-3.3V15H8.35v-3.35H5v-3.3h3.35V5h3.35v3.35H15v3.3"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#cccccc",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M2 2h16v16H2V2"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M11.7 8.35H15v3.3h-3.3V15H8.35v-3.35H5v-3.3h3.35V5h3.35v3.35"
    }]],
    ab15: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M18 2h-4v16h4V2m-6 9.65V8.3H8.7V5H5.35v3.3H2v3.35h3.35V15H8.7v-3.35H12M0 0h20v20H0V0"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M12 11.65H8.7V15H5.35v-3.35H2V8.3h3.35V5H8.7v3.3H12v3.35M18 2v16h-4V2h4"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M12 11.65H8.7V15H5.35v-3.35H2V8.3h3.35V5H8.7v3.3H12v3.35M18 2v16h-4V2h4"
    }]],
    ab16: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M14 11v1h4V8h-1l1-1H2l1 1H2v4h4v-1l3 3H8v4h4v-4h-1l3-3m-2-5V2H8v4h4m6 0V2h-4v4h4M6 6V2H2v4h4m8 8v4h4v-4h-4M2 14v4h4v-4H2M20 0v20H0V0h20"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M18 6h-4V2h4v4m-6 0H8V2h4v4m5 2h1v4h-4V8h3m-6 6h1v4H8v-4h3m-5-3v1H2V8h4v3m6 1H8V8h4v4M2 14h4v4H2v-4m12 0h4v4h-4v-4"
    }, {
        _t: "path",
        fill: "#cccccc",
        d: "M14 11l-3 3H9l-3-3V8H3L2 7h16l-1 1h-3v3m-2 1V8H8v4h4"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M6 2v4H2V2h4"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M18 6h-4V2h4v4m-6 0H8V2h4v4m5 2h1v4h-4v-1m-3 3h1v4H8v-4h3m-5-3v1H2V8h4v3m11-3h-3v3m-2 1H8V8h4v4M2 14h4v4H2v-4m12 0h4v4h-4v-4"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#cccccc",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M14 11l-3 3m-2 0l-3-3M3 8L2 7h16l-1 1"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M6 2v4H2V2h4"
    }]],
    ab17: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M9 11.05q-.05-.85.55-1.45.6-.7 1.45-.6.5.05.9.25l.5.45.55 1 .55.5q.6.4 1.3.4.75 0 1.25-.5l.75-1.2-.75 1.2q-.5.5-1.25.5-.7 0-1.3-.4l-.55-.5-.55-1-.5-.45q-.4-.2-.9-.25-.85-.1-1.45.6-.6.6-.55 1.45M4 18q.85 0 1.4-.6.6-.55.6-1.4 0-.85-.6-1.45Q4.85 14 4 14q-.8 0-1.4.55-.6.6-.6 1.45t.6 1.4q.6.6 1.4.6m-1.4-6.6q.6.6 1.4.6l.7-.1.7-.5q.6-.55.6-1.4 0-.85-.6-1.45Q4.85 8 4 8q-.8 0-1.4.55Q2 9.15 2 10t.6 1.4m2.8-6Q6 4.85 6 4q0-.85-.6-1.45Q4.85 2 4 2q-.8 0-1.4.55Q2 3.15 2 4t.6 1.4Q3.2 6 4 6q.85 0 1.4-.6M0 0h20v20H0V0"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M5.4 5.4Q4.85 6 4 6q-.8 0-1.4-.6Q2 4.85 2 4q0-.85.6-1.45Q3.2 2 4 2q.85 0 1.4.55.6.6.6 1.45t-.6 1.4m-2.8 6Q2 10.85 2 10q0-.85.6-1.45Q3.2 8 4 8q.85 0 1.4.55.6.6.6 1.45t-.6 1.4l-.7.5-.7.1q-.8 0-1.4-.6M4 18q-.8 0-1.4-.6Q2 16.85 2 16q0-.85.6-1.45Q3.2 14 4 14q.85 0 1.4.55.6.6.6 1.45t-.6 1.4q-.55.6-1.4.6"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M16.8 9.9l-.75 1.2q-.5.5-1.25.5-.7 0-1.3-.4l-.55-.5-.55-1-.5-.45q-.4-.2-.9-.25-.85-.1-1.45.6-.6.6-.55 1.45M5.4 5.4Q4.85 6 4 6q-.8 0-1.4-.6Q2 4.85 2 4q0-.85.6-1.45Q3.2 2 4 2q.85 0 1.4.55.6.6.6 1.45t-.6 1.4m-2.8 6Q2 10.85 2 10q0-.85.6-1.45Q3.2 8 4 8q.85 0 1.4.55.6.6.6 1.45t-.6 1.4l-.7.5-.7.1q-.8 0-1.4-.6M4 18q-.8 0-1.4-.6Q2 16.85 2 16q0-.85.6-1.45Q3.2 14 4 14q.85 0 1.4.55.6.6.6 1.45t-.6 1.4q-.55.6-1.4.6"
    }]],
    ab18: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M20 0v20H0V0h20m-2 18V2H2v16h16"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M15 11v4h-4v-4h4M5 5h4v4H5V5"
    }, {
        _t: "path",
        fill: "#cccccc",
        d: "M5 5v4h4V5H5m10 6h-4v4h4v-4m3 7H2V2h16v16"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M15 11v4h-4v-4h4M5 5h4v4H5V5"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#cccccc",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M18 18H2V2h16v16"
    }]],
    ab19: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M12.6 18H18V2h-5.4H18v16h-5.4V2H2v16h10.6M0 0h20v20H0V0"
    }, {
        _t: "path",
        fill: "#cccccc",
        d: "M7.3 18H2V2h5.3v16"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M7.3 18V2h5.3v16H7.3"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#cccccc",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M12.6 2H18v16H2V2h10.6v16M7.3 2v16"
    }]],
    ab20: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M14.2 10.85l.4.55q.6.6 1.4.6.85 0 1.4-.6.6-.55.6-1.4 0-.85-.6-1.45l-.55-.35L16 8q-.8 0-1.4.55-.6.6-.6 1.45l.2.85-3.35 3.35 3.35-3.35M12 10q0-.85-.6-1.45Q10.85 8 10 8q-.8 0-1.4.55Q8 9.15 8 10t.6 1.4q.6.6 1.4.6.85 0 1.4-.6.6-.55.6-1.4m-.6-4.6q.6-.55.6-1.4 0-.85-.6-1.45Q10.85 2 10 2q-.8 0-1.4.55Q8 3.15 8 4t.6 1.4q.6.6 1.4.6.85 0 1.4-.6m-.15 12.15l.15-.15q.6-.55.6-1.4 0-.85-.6-1.45-.25-.25-.55-.35L10 14l-.8.2q-.35.1-.6.35l-.35.5Q8 15.45 8 16q0 .85.6 1.4.6.6 1.4.6l1.25-.45.55.05q.75 0 1.25-.5l.75-1.2-.75 1.2q-.5.5-1.25.5l-.55-.05M3.2 8.2L2 7h16l-1.15 1.2L18 7H2l1.2 1.2-.6.35Q2 9.15 2 10t.6 1.4q.6.6 1.4.6.85 0 1.4-.6l.45-.55L6 10q0-.85-.6-1.45Q4.85 8 4 8l-.8.2m6 6l-3.35-3.35L9.2 14.2M6 17.05q-.05-.85.55-1.45.6-.7 1.45-.6l.25.05L8 15q-.85-.1-1.45.6-.6.6-.55 1.45M20 0v20H0V0h20"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M11.4 5.4q-.55.6-1.4.6-.8 0-1.4-.6Q8 4.85 8 4q0-.85.6-1.45Q9.2 2 10 2q.85 0 1.4.55.6.6.6 1.45t-.6 1.4M12 10q0 .85-.6 1.4-.55.6-1.4.6-.8 0-1.4-.6Q8 10.85 8 10q0-.85.6-1.45Q9.2 8 10 8q.85 0 1.4.55.6.6.6 1.45m4.85-1.8l.55.35q.6.6.6 1.45t-.6 1.4q-.55.6-1.4.6-.8 0-1.4-.6l-.4-.55L14 10q0-.85.6-1.45Q15.2 8 16 8l.85.2-2.65 2.65 2.65-2.65m-6 6q.3.1.55.35.6.6.6 1.45t-.6 1.4l-.15.15-.75-.35-.55-.5-.55-1q-.4-.5-1.15-.65.75.15 1.15.65l.55 1 .55.5.75.35L10 18q-.8 0-1.4-.6Q8 16.85 8 16q0-.55.25-.95l.35-.5q.25-.25.6-.35l.8-.2.85.2-.85.8-.8-.8.8.8.85-.8m-7.65-6L4 8q.85 0 1.4.55.6.6.6 1.45l-.15.85-.45.55q-.55.6-1.4.6-.8 0-1.4-.6Q2 10.85 2 10q0-.85.6-1.45l.6-.35 2.65 2.65L3.2 8.2"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M11.4 5.4q-.55.6-1.4.6-.8 0-1.4-.6Q8 4.85 8 4q0-.85.6-1.45Q9.2 2 10 2q.85 0 1.4.55.6.6.6 1.45t-.6 1.4M12 10q0 .85-.6 1.4-.55.6-1.4.6-.8 0-1.4-.6Q8 10.85 8 10q0-.85.6-1.45Q9.2 8 10 8q.85 0 1.4.55.6.6.6 1.45m4.85-1.8l.55.35q.6.6.6 1.45t-.6 1.4q-.55.6-1.4.6-.8 0-1.4-.6l-.4-.55-3.35 3.35q.3.1.55.35.6.6.6 1.45t-.6 1.4l-.15.15.55.05q.75 0 1.25-.5l.75-1.2m.4-5.05L14 10q0-.85.6-1.45Q15.2 8 16 8l.85.2L18 7H2l1.2 1.2L4 8q.85 0 1.4.55.6.6.6 1.45l-.15.85L9.2 14.2l.8-.2.85.2-.85.8-.8-.8q-.35.1-.6.35l-.35.5q.75.15 1.15.65l.55 1 .55.5.75.35L10 18q-.8 0-1.4-.6Q8 16.85 8 16q0-.55.25-.95L8 15q-.85-.1-1.45.6-.6.6-.55 1.45m8.2-6.2l2.65-2.65m-11 2.65l-.45.55q-.55.6-1.4.6-.8 0-1.4-.6Q2 10.85 2 10q0-.85.6-1.45l.6-.35 2.65 2.65"
    }]],
    ab21: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#ABA9A8",
        d: "M2 2h4v16H2V2m16 9.65h-3.35V15H11.3v-3.35H8V8.3h3.3V5h3.35v3.3H18v3.35"
    }, {
        _t: "path",
        fill: "#E3E3E3",
        d: "M18 11.65V8.3h-3.35V5H11.3v3.3H8v3.35h3.3V15h3.35v-3.35H18M2 2v16h4V2H2M0 0h20v20H0V0"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M18 11.65V8.3h-3.35V5H11.3v3.3H8v3.35h3.3V15h3.35v-3.35H18M2 2v16h4V2H2"
    }]],
    ab22: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M9 10L5 6v8l4-4m7 0l-4-4v8l4-4m4-10v20H0V0h20"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M16 10l-4 4V6l4 4m-7 0l-4 4V6l4 4"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M16 10l-4 4V6l4 4m-7 0l-4 4V6l4 4"
    }]],
    ab23: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M17.4 17.4q.6-.55.6-1.4 0-.85-.6-1.45Q16.85 14 16 14q-.8 0-1.4.55-.6.6-.6 1.45t.6 1.4q.6.6 1.4.6l.7-.1.7-.5M4 18q.85 0 1.4-.6.6-.55.6-1.4 0-.85-.6-1.45Q4.85 14 4 14q-.8 0-1.4.55-.6.6-.6 1.45t.6 1.4q.6.6 1.4.6M5.4 5.4Q6 4.85 6 4q0-.85-.6-1.45Q4.85 2 4 2q-.8 0-1.4.55Q2 3.15 2 4t.6 1.4Q3.2 6 4 6q.85 0 1.4-.6m5.3 6.5l.7-.5q.6-.55.6-1.4 0-.85-.6-1.45Q10.85 8 10 8q-.8 0-1.4.55Q8 9.15 8 10t.6 1.4q.6.6 1.4.6l.7-.1m6.7-6.5q.6-.55.6-1.4 0-.85-.6-1.45Q16.85 2 16 2q-.8 0-1.4.55-.6.6-.6 1.45t.6 1.4q.6.6 1.4.6l.7-.1.7-.5M10 15l8-8H2l8 8-8-8h16l-8 8M0 0h20v20H0V0"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M17.4 5.4l-.7.5-.7.1q-.8 0-1.4-.6Q14 4.85 14 4q0-.85.6-1.45Q15.2 2 16 2q.85 0 1.4.55.6.6.6 1.45t-.6 1.4m-6.7 6.5l-.7.1q-.8 0-1.4-.6Q8 10.85 8 10q0-.85.6-1.45Q9.2 8 10 8q.85 0 1.4.55.6.6.6 1.45t-.6 1.4l-.7.5M5.4 5.4Q4.85 6 4 6q-.8 0-1.4-.6Q2 4.85 2 4q0-.85.6-1.45Q3.2 2 4 2q.85 0 1.4.55.6.6.6 1.45t-.6 1.4M4 18q-.8 0-1.4-.6Q2 16.85 2 16q0-.85.6-1.45Q3.2 14 4 14q.85 0 1.4.55.6.6.6 1.45t-.6 1.4q-.55.6-1.4.6m13.4-.6l-.7.5-.7.1q-.8 0-1.4-.6-.6-.55-.6-1.4 0-.85.6-1.45.6-.55 1.4-.55.85 0 1.4.55.6.6.6 1.45t-.6 1.4"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M17.4 5.4l-.7.5-.7.1q-.8 0-1.4-.6Q14 4.85 14 4q0-.85.6-1.45Q15.2 2 16 2q.85 0 1.4.55.6.6.6 1.45t-.6 1.4m-6.7 6.5l-.7.1q-.8 0-1.4-.6Q8 10.85 8 10q0-.85.6-1.45Q9.2 8 10 8q.85 0 1.4.55.6.6.6 1.45t-.6 1.4l-.7.5M5.4 5.4Q4.85 6 4 6q-.8 0-1.4-.6Q2 4.85 2 4q0-.85.6-1.45Q3.2 2 4 2q.85 0 1.4.55.6.6.6 1.45t-.6 1.4M4 18q-.8 0-1.4-.6Q2 16.85 2 16q0-.85.6-1.45Q3.2 14 4 14q.85 0 1.4.55.6.6.6 1.45t-.6 1.4q-.55.6-1.4.6m13.4-.6l-.7.5-.7.1q-.8 0-1.4-.6-.6-.55-.6-1.4 0-.85.6-1.45.6-.55 1.4-.55.85 0 1.4.55.6.6.6 1.45t-.6 1.4M10 15L2 7h16l-8 8"
    }]],
    ab24: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M11 6h1V2H8v4h1L6 9l3-3h2l3 3-3-3m6 6h1V8h-4v4h3l1 1H2l1-1-1 1h16l-1-1M6 9V8H2v4h4V9m6 3V8H8v4h4m-4 2v4h4v-4H8M20 0v20H0V0h20"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M9 6H8V2h4v4h-1l-1-1-1 1 1-1 1 1H9m5 3V8h4v4h-4V9l3 3-3-3M3 12H2V8h4v4H3l3-3-3 3m9 0H8V8h4v4m-4 2h4v4H8v-4"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M9 6H8V2h4v4h-1l3 3V8h4v4h-1l1 1H2l1-1H2V8h4v1l3-3 1-1 1 1H9m3 6H8V8h4v4m5 0h-3V9l3 3M6 9v3H3l3-3m2 5h4v4H8v-4"
    }]],
    ab25: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#ABA9A8",
        d: "M8 10l4-4v8l-4-4m-2 4v4H2v-4h4m0-6v4H2V8h4m0-6v4H2V2h4"
    }, {
        _t: "path",
        fill: "#E3E3E3",
        d: "M6 2H2v4h4V2m0 6H2v4h4V8m0 6H2v4h4v-4m2-4l4 4V6l-4 4M0 0h20v20H0V0"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M6 2H2v4h4V2m0 6H2v4h4V8m0 6H2v4h4v-4m2-4l4 4V6l-4 4"
    }]],
    ab26: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M18 6l-4 4 4 4V6m-6 2H8v4h4V8m0-6H8v4h4V2M2 6v8l4-4-4-4m6 12h4v-4H8v4M20 0v20H0V0h20"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M18 6v8l-4-4 4-4M8 18v-4h4v4H8M2 6l4 4-4 4V6m10-4v4H8V2h4m0 6v4H8V8h4"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M18 6v8l-4-4 4-4m-6 2H8v4h4V8m0-6H8v4h4V2M2 6v8l4-4-4-4m6 12h4v-4H8v4"
    }]],
    ab27: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M14.6 8.55q-.6.6-.6 1.45t.6 1.4q.6.6 1.4.6l.7-.1.7-.5q.6-.55.6-1.4 0-.85-.6-1.45Q16.85 8 16 8q-.8 0-1.4.55M18 4q0-.85-.6-1.45Q16.85 2 16 2q-.8 0-1.4.55-.6.6-.6 1.45t.6 1.4q.6.6 1.4.6.85 0 1.4-.6.6-.55.6-1.4m-8 8L6 8l-4 4h8m7.4 2.55Q16.85 14 16 14q-.8 0-1.4.55-.6.6-.6 1.45t.6 1.4q.6.6 1.4.6.85 0 1.4-.6.6-.55.6-1.4 0-.85-.6-1.45M20 0v20H0V0h20"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M18 4q0 .85-.6 1.4-.55.6-1.4.6-.8 0-1.4-.6Q14 4.85 14 4q0-.85.6-1.45Q15.2 2 16 2q.85 0 1.4.55.6.6.6 1.45m-3.4 4.55Q15.2 8 16 8q.85 0 1.4.55.6.6.6 1.45t-.6 1.4l-.7.5-.7.1q-.8 0-1.4-.6-.6-.55-.6-1.4 0-.85.6-1.45m2.8 6q.6.6.6 1.45t-.6 1.4q-.55.6-1.4.6-.8 0-1.4-.6-.6-.55-.6-1.4 0-.85.6-1.45.6-.55 1.4-.55.85 0 1.4.55M6 8l4 4H2l4-4"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M18 4q0 .85-.6 1.4-.55.6-1.4.6-.8 0-1.4-.6Q14 4.85 14 4q0-.85.6-1.45Q15.2 2 16 2q.85 0 1.4.55.6.6.6 1.45m-3.4 4.55Q15.2 8 16 8q.85 0 1.4.55.6.6.6 1.45t-.6 1.4l-.7.5-.7.1q-.8 0-1.4-.6-.6-.55-.6-1.4 0-.85.6-1.45m2.8 6q.6.6.6 1.45t-.6 1.4q-.55.6-1.4.6-.8 0-1.4-.6-.6-.55-.6-1.4 0-.85.6-1.45.6-.55 1.4-.55.85 0 1.4.55M6 8l4 4H2l4-4"
    }]],
    ab28: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M16.9 5.85l.5-.45q.6-.55.6-1.4 0-.85-.6-1.45Q16.85 2 16 2q-.8 0-1.4.55l-.4.55Q12.45 2 10.1 2q2.35 0 4.1 1.1L14 4q0 .85.6 1.4.6.6 1.4.6l.7-.1.2-.05q1.1 1.8 1.1 4.1 0-2.3-1.1-4.1M18 10.1v-.15q-.05-.85-.6-1.4Q16.85 8 16 8q-.8 0-1.4.55-.6.6-.6 1.45t.6 1.4q.6.6 1.4.6l.7-.1.7-.5q.55-.5.6-1.3 0 2.3-1.15 4.05Q18 12.4 18 10.1m-3.8 6.75l.4.55q.6.6 1.4.6l.7-.1.7-.5q.6-.55.6-1.4 0-.85-.6-1.45l-.55-.4L16 14q-.8 0-1.4.55-.6.6-.6 1.45l.2.85Q12.4 18 10.1 18q2.3 0 4.1-1.15M9.95 18h.15l.6-.1.7-.5q.6-.55.6-1.4 0-.85-.6-1.45Q10.85 14 10 14q-.8 0-1.4.55-.6.6-.6 1.45t.6 1.4q.6.6 1.35.6-2.25 0-4.1-1.2Q7.7 18 9.95 18M3.2 14.2l-.6.35Q2 15.15 2 16t.6 1.4q.6.6 1.4.6.85 0 1.4-.6l.45-.6L6 16q0-.85-.6-1.45Q4.85 14 4 14l-.8.2Q2 12.4 2 10.1q0 2.3 1.2 4.1M2 9.95v.15q.05.8.6 1.3.6.6 1.4.6l.7-.1.7-.5q.6-.55.6-1.4 0-.85-.6-1.45Q4.85 8 4 8q-.8 0-1.4.55-.55.55-.6 1.4 0-2.3 1.15-4.15Q2 7.65 2 9.95m3.85-6.8l-.45-.6Q4.85 2 4 2q-.8 0-1.4.55Q2 3.15 2 4t.6 1.4l.55.4L4 6q.85 0 1.4-.6Q6 4.85 6 4l-.15-.85Q7.65 2 9.95 2q-2.3 0-4.1 1.15M10.1 2h-.15q-.8.05-1.35.55Q8 3.15 8 4t.6 1.4q.6.6 1.4.6l.7-.1.7-.5q.6-.55.6-1.4 0-.85-.6-1.45-.5-.5-1.3-.55m.6 9.9l.7-.5q.6-.55.6-1.4 0-.85-.6-1.45Q10.85 8 10 8q-.8 0-1.4.55Q8 9.15 8 10t.6 1.4q.6.6 1.4.6l.7-.1M20 20H0V0h20v20"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M14.2 3.1l.4-.55Q15.2 2 16 2q.85 0 1.4.55.6.6.6 1.45t-.6 1.4l-.5.45-1.3-1.65-1.4-1.1 1.4 1.1 1.3 1.65-.2.05-.7.1q-.8 0-1.4-.6Q14 4.85 14 4l.2-.9M18 9.95v.15q-.05.8-.6 1.3l-.7.5-.7.1q-.8 0-1.4-.6-.6-.55-.6-1.4 0-.85.6-1.45Q15.2 8 16 8q.85 0 1.4.55.55.55.6 1.4m-1.15 4.2l.55.4q.6.6.6 1.45t-.6 1.4l-.7.5-.7.1q-.8 0-1.4-.6l-.4-.55L14 16q0-.85.6-1.45.6-.55 1.4-.55l.85.15-1.25 1.45-1.4 1.25 1.4-1.25 1.25-1.45M10.1 18h-.15q-.75 0-1.35-.6Q8 16.85 8 16q0-.85.6-1.45Q9.2 14 10 14q.85 0 1.4.55.6.6.6 1.45t-.6 1.4l-.7.5-.6.1m-4.25-1.2l-.45.6q-.55.6-1.4.6-.8 0-1.4-.6Q2 16.85 2 16q0-.85.6-1.45l.6-.35.8-.2q.85 0 1.4.55.6.6.6 1.45l-.15.8-1.45-1.2-1.2-1.4 1.2 1.4 1.45 1.2M2 10.1v-.15q.05-.85.6-1.4Q3.2 8 4 8q.85 0 1.4.55.6.6.6 1.45t-.6 1.4l-.7.5-.7.1q-.8 0-1.4-.6-.55-.5-.6-1.3m1.15-4.3l-.55-.4Q2 4.85 2 4q0-.85.6-1.45Q3.2 2 4 2q.85 0 1.4.55l.45.6L6 4q0 .85-.6 1.4Q4.85 6 4 6l-.85-.2q.5-.85 1.25-1.6l1.45-1.05L4.4 4.2q-.75.75-1.25 1.6M9.95 2h.15q.8.05 1.3.55.6.6.6 1.45t-.6 1.4l-.7.5-.7.1q-.8 0-1.4-.6Q8 4.85 8 4q0-.85.6-1.45.55-.5 1.35-.55m.75 9.9l-.7.1q-.8 0-1.4-.6Q8 10.85 8 10q0-.85.6-1.45Q9.2 8 10 8q.85 0 1.4.55.6.6.6 1.45t-.6 1.4l-.7.5"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M16.9 5.85l.5-.45q.6-.55.6-1.4 0-.85-.6-1.45Q16.85 2 16 2q-.8 0-1.4.55l-.4.55 1.4 1.1 1.3 1.65q1.1 1.8 1.1 4.1v.15q0 2.3-1.15 4.05l.55.4q.6.6.6 1.45t-.6 1.4l-.7.5-.7.1q-.8 0-1.4-.6l-.4-.55Q12.4 18 10.1 18h-.15q-2.25 0-4.1-1.2l-.45.6q-.55.6-1.4.6-.8 0-1.4-.6Q2 16.85 2 16q0-.85.6-1.45l.6-.35Q2 12.4 2 10.1v-.15q0-2.3 1.15-4.15l-.55-.4Q2 4.85 2 4q0-.85.6-1.45Q3.2 2 4 2q.85 0 1.4.55l.45.6Q7.65 2 9.95 2h.15q2.35 0 4.1 1.1L14 4q0 .85.6 1.4.6.6 1.4.6l.7-.1.2-.05M10.1 2q.8.05 1.3.55.6.6.6 1.45t-.6 1.4l-.7.5-.7.1q-.8 0-1.4-.6Q8 4.85 8 4q0-.85.6-1.45.55-.5 1.35-.55m.75 9.9l-.7.1q-.8 0-1.4-.6Q8 10.85 8 10q0-.85.6-1.45Q9.2 8 10 8q.85 0 1.4.55.6.6.6 1.45t-.6 1.4l-.7.5m7.3-1.8q-.05.8-.6 1.3l-.7.5-.7.1q-.8 0-1.4-.6-.6-.55-.6-1.4 0-.85.6-1.45Q15.2 8 16 8q.85 0 1.4.55.55.55.6 1.4M5.85 3.15L6 4q0 .85-.6 1.4Q4.85 6 4 6l-.85-.2q.5-.85 1.25-1.6l1.45-1.05M2 9.95q.05-.85.6-1.4Q3.2 8 4 8q.85 0 1.4.55.6.6.6 1.45t-.6 1.4l-.7.5-.7.1q-.8 0-1.4-.6-.55-.5-.6-1.3M9.95 18q-.75 0-1.35-.6Q8 16.85 8 16q0-.85.6-1.45Q9.2 14 10 14q.85 0 1.4.55.6.6.6 1.45t-.6 1.4l-.7.5-.6.1m-6.9-3.8L4 14q.85 0 1.4.55.6.6.6 1.45l-.15.8-1.45-1.2-1.2-1.4m11 2.65L14 16q0-.85.6-1.45.6-.55 1.4-.55l.85.15-1.25 1.45-1.4 1.25"
    }]],
    ab29: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M4 10q0 .85.6 1.4.6.6 1.35.6h.1q.8 0 1.35-.6.6-.55.6-1.4 0-.85-.6-1.45Q6.85 8 6 8q-.8 0-1.4.55Q4 9.15 4 10m11-1.75L14 8q-.8 0-1.4.55-.6.6-.6 1.45t.6 1.4q.6.6 1.4.6l.7-.1.35-.15.35-.35q.6-.55.6-1.4 0-.85-.6-1.45l-.4-.3M20 0v20H0V0h20"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M15 8.25l.4.3q.6.6.6 1.45t-.6 1.4l-.35.35-.35.15-.7.1q-.8 0-1.4-.6-.6-.55-.6-1.4 0-.85.6-1.45Q13.2 8 14 8l1 .25M4 10q0-.85.6-1.45Q5.2 8 6 8q.85 0 1.4.55.6.6.6 1.45t-.6 1.4q-.55.6-1.35.6h-.1q-.75 0-1.35-.6Q4 10.85 4 10"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M15 8.25l.4.3q.6.6.6 1.45t-.6 1.4l-.35.35-.35.15-.7.1q-.8 0-1.4-.6-.6-.55-.6-1.4 0-.85.6-1.45Q13.2 8 14 8l1 .25M4 10q0-.85.6-1.45Q5.2 8 6 8q.85 0 1.4.55.6.6.6 1.45t-.6 1.4q-.55.6-1.35.6h-.1q-.75 0-1.35-.6Q4 10.85 4 10"
    }]],
    ab30: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M12.65 7.35V2H7.3v5.35H2v5.35h5.3V18h5.35v-5.3H18V7.35h-5.35M0 20V0h20v20H0"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M11.4 11.4q-.55.6-1.4.6-.8 0-1.4-.6Q8 10.85 8 10q0-.85.6-1.45Q9.2 8 10 8q.85 0 1.4.55.6.6.6 1.45t-.6 1.4"
    }, {
        _t: "path",
        fill: "#cccccc",
        d: "M11.4 11.4q.6-.55.6-1.4 0-.85-.6-1.45Q10.85 8 10 8q-.8 0-1.4.55Q8 9.15 8 10t.6 1.4q.6.6 1.4.6.85 0 1.4-.6m1.25-4.05H18v5.35h-5.35V18H7.3v-5.3H2V7.35h5.3V2h5.35v5.35"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M11.4 11.4q-.55.6-1.4.6-.8 0-1.4-.6Q8 10.85 8 10q0-.85.6-1.45Q9.2 8 10 8q.85 0 1.4.55.6.6.6 1.45t-.6 1.4"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#cccccc",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M12.65 7.35H18v5.35h-5.35V18H7.3v-5.3H2V7.35h5.3V2h5.35v5.35"
    }]],
    ab31: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M11 16.7h5.7l-.05-5.7L11 16.7m-8 0l5.7-.05L3 11v5.7m.05-8L8.7 3H3l.05 5.7m13.65 0V3l-5.7.05 5.7 5.65M20 0v20H0V0h20"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M16.7 8.7L11 3.05 16.7 3v5.7m-13.65 0L3 3h5.7L3.05 8.7m-.05 8V11l5.7 5.65-5.7.05m8 0l5.65-5.7.05 5.7H11"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M16.7 8.7L11 3.05 16.7 3v5.7m-13.65 0L3 3h5.7L3.05 8.7m-.05 8V11l5.7 5.65-5.7.05m8 0l5.65-5.7.05 5.7H11"
    }]],
    ab32: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M13 10l4 4V6l-4 4M6 3l4 4 4-4H6m1 7L3 6v8l4-4m-1 7h8l-4-4-4 4M20 0v20H0V0h20"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M13 10l4-4v8l-4-4m-6 0l-4 4V6l4 4M6 3h8l-4 4-4-4m0 14l4-4 4 4H6"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M13 10l4 4V6l-4 4m-6 0l-4 4V6l4 4M6 3h8l-4 4-4-4m0 14h8l-4-4-4 4"
    }]],
    ab33: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M12.65 7.35V2H7.3v5.35H2v5.35h5.3V18h5.35v-5.3H18V7.35h-5.35M18 18v-4h-4v4h4M6 18v-4H2v4h4M6 6V2H2v4h4m12 0V2h-4v4h4M0 20V0h20v20H0"
    }, {
        _t: "path",
        fill: "#ABA9A8",
        d: "M12 12H8V8h4v4m6-6h-4V2h4v4M6 6H2V2h4v4m0 12H2v-4h4v4m12 0h-4v-4h4v4"
    }, {
        _t: "path",
        fill: "#cccccc",
        d: "M12.65 7.35H18v5.35h-5.35V18H7.3v-5.3H2V7.35h5.3V2h5.35v5.35M12 12V8H8v4h4"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M12 12H8V8h4v4m6-6h-4V2h4v4M6 6H2V2h4v4m0 12H2v-4h4v4m12 0h-4v-4h4v4"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#cccccc",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M12.65 7.35H18v5.35h-5.35V18H7.3v-5.3H2V7.35h5.3V2h5.35v5.35"
    }]],
    ab34: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#cccccc",
        d: "M12 10.6q-.05-.65.45-1.1.45-.55 1.1-.5.75.1 1.1.55l.35.7-.35-.7q-.35-.45-1.1-.55-.65-.05-1.1.5-.5.45-.45 1.1M9.45 8q.65.05 1.1-.4.55-.45.45-1.1l-.1-.5-.4-.6-.55-.3L9.7 5l.25.1.55.3.4.6.1.5q.1.65-.45 1.1-.45.45-1.1.4M15 10.25V15H9.85l-.15-.05-.35-.4q-.35-.45-.35-1 0-.6.4-.95.4-.4.95-.6-.55.2-.95.6-.4.35-.4.95 0 .55.35 1l.35.4.15.05H5V5h10v5.25M8 9.7l-.55.95q-.4.35-.95.35l-.5-.05-.5-.25-.4-.35h-.05l-.05-.1.05.1h.05l.4.35.5.25.5.05q.55 0 .95-.35L8 9.7"
    }, {
        _t: "path",
        fill: "#E3E3E3",
        d: "M15 10.25l.05.1h.05l.35.35.55.25.45.05q.6 0 1-.35L18 9.7l-.55.95q-.4.35-1 .35l-.45-.05-.55-.25-.35-.35h-.05l-.05-.1V5H9.7l-.35-.45Q9 4.1 9 3.55t.4-.95q.4-.4.95-.6-.55.2-.95.6-.4.4-.4.95 0 .55.35 1L9.7 5H5v5.25l-.35-.7Q4.3 9.1 3.55 9q-.65-.05-1.1.5Q2 9.95 2 10.6q0-.65.45-1.1.45-.55 1.1-.5.75.1 1.1.55l.35.7V15h10v-4.75M9.45 18q.65.05 1.1-.4.55-.45.45-1.15l-.05-.45-.45-.6-.55-.3-.1-.1.1.1.55.3.45.6.05.45q.1.7-.45 1.15-.45.45-1.1.4M0 0h20v20H0V0"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M9.7 5l.25.1.55.3.4.6.1.5q.1.65-.45 1.1-.45.45-1.1.4M15 10.25l-.35-.7q-.35-.45-1.1-.55-.65-.05-1.1.5-.5.45-.45 1.1m6-.9l-.55.95q-.4.35-1 .35l-.45-.05-.55-.25-.35-.35h-.05l-.05-.1M9.85 15l.1.1.55.3.45.6.05.45q.1.7-.45 1.15-.45.45-1.1.4m.9-16q-.55.2-.95.6-.4.4-.4.95 0 .55.35 1L9.7 5M5 10.25l.05.1h.05l.4.35.5.25.5.05q.55 0 .95-.35L8 9.7m-3 .55l-.35-.7Q4.3 9.1 3.55 9q-.65-.05-1.1.5Q2 9.95 2 10.6M9.85 15l-.15-.05-.35-.4q-.35-.45-.35-1 0-.6.4-.95.4-.4.95-.6"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#cccccc",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M15 10.25V15H9.85M9.7 5H15v5.25M9.7 5H5v10h4.85"
    }]],
    ab35: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#E3E3E3",
        d: "M6 17.05q-.05-.85.55-1.45.6-.7 1.45-.6.95.1 1.4.7l.55 1 .55.5q.6.4 1.3.4.75 0 1.25-.5l.75-1.2-.75 1.2q-.5.5-1.25.5-.7 0-1.3-.4l-.55-.5-.55-1q-.45-.6-1.4-.7-.85-.1-1.45.6-.6.6-.55 1.45M3.55 13.8q.85.05 1.45-.55.7-.6.6-1.45-.1-.95-.7-1.4l-1-.55-.5-.55Q3 8.7 3 8q0-.75.5-1.25L4.7 6l-1.2.75Q3 7.25 3 8q0 .7.4 1.3l.5.55 1 .55q.6.45.7 1.4.1.85-.6 1.45-.6.6-1.45.55m12 0q.85.05 1.45-.55.7-.6.6-1.45-.1-.95-.7-1.4l-1-.55-.5-.55Q15 8.7 15 8q0-.75.5-1.25L16.7 6l-1.2.75Q15 7.25 15 8q0 .7.4 1.3l.5.55 1 .55q.6.45.7 1.4.1.85-.6 1.45-.6.6-1.45.55M6 4.05q-.05-.85.55-1.45.6-.7 1.45-.6.95.1 1.4.7l.55 1 .55.5q.6.4 1.3.4.75 0 1.25-.5l.75-1.2-.75 1.2q-.5.5-1.25.5-.7 0-1.3-.4l-.55-.5-.55-1Q8.95 2.1 8 2q-.85-.1-1.45.6-.6.6-.55 1.45M0 0h20v20H0V0"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M13.8 2.9l-.75 1.2q-.5.5-1.25.5-.7 0-1.3-.4l-.55-.5-.55-1Q8.95 2.1 8 2q-.85-.1-1.45.6-.6.6-.55 1.45M16.7 6l-1.2.75Q15 7.25 15 8q0 .7.4 1.3l.5.55 1 .55q.6.45.7 1.4.1.85-.6 1.45-.6.6-1.45.55M4.7 6l-1.2.75Q3 7.25 3 8q0 .7.4 1.3l.5.55 1 .55q.6.45.7 1.4.1.85-.6 1.45-.6.6-1.45.55m10.25 2.1l-.75 1.2q-.5.5-1.25.5-.7 0-1.3-.4l-.55-.5-.55-1q-.45-.6-1.4-.7-.85-.1-1.45.6-.6.6-.55 1.45"
    }]],
    ab36: ["0 0 20.0 20.0", [{
        _t: "path",
        fill: "#cccccc",
        d: "M9.45 18h-2.1v-5.35H2V7.35h5.35V2h5.35v5.35H18V12.65h-5.3V18H9.45m.25 0q.5-.05.85-.4.55-.45.45-1.15l-.05-.45-.45-.6-.55-.3-.1-.1-.15-.05-.35-.4q-.35-.45-.35-1 0-.6.4-.95.4-.4.95-.6-.55.2-.95.6-.4.35-.4.95 0 .55.35 1l.35.4.15.05.1.1.55.3.45.6.05.45q.1.7-.45 1.15-.35.35-.85.4M2 10.55q0-.6.45-1.05.45-.55 1.1-.5.75.1 1.1.55l.35.7.05.1h.05l.4.35.5.25.5.05q.55 0 .95-.35L8 9.7l-.55.95q-.4.35-.95.35l-.5-.05-.5-.25-.4-.35h-.05l-.05-.1-.35-.7Q4.3 9.1 3.55 9q-.65-.05-1.1.5Q2 9.95 2 10.55m10 .05q-.05-.65.45-1.1.45-.55 1.1-.5.75.1 1.1.55l.35.7.05.1.4.35.55.25.45.05q.6 0 1-.35L18 9.7l-.55.95q-.4.35-1 .35l-.45-.05-.55-.25-.4-.35-.05-.1-.35-.7q-.35-.45-1.1-.55-.65-.05-1.1.5-.5.45-.45 1.1M9.45 8q.65.05 1.1-.4.55-.45.45-1.1l-.1-.5-.4-.6-.55-.3L9.7 5l-.35-.45Q9 4.1 9 3.55t.4-.95q.4-.4.95-.6-.55.2-.95.6-.4.4-.4.95 0 .55.35 1L9.7 5l.25.1.55.3.4.6.1.5q.1.65-.45 1.1-.45.45-1.1.4"
    }, {
        _t: "path",
        fill: "#E3E3E3",
        d: "M9.7 18h3v-5.35H18V7.35h-5.3V2H7.35v5.35H2V12.65h5.35V18H9.7M20 0v20H0V0h20"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#ABA9A8",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M9.7 18h-.25m.9-16q-.55.2-.95.6-.4.4-.4.95 0 .55.35 1L9.7 5l.25.1.55.3.4.6.1.5q.1.65-.45 1.1-.45.45-1.1.4M18 9.7l-.55.95q-.4.35-1 .35l-.45-.05-.55-.25-.4-.35-.05-.1-.35-.7q-.35-.45-1.1-.55-.65-.05-1.1.5-.5.45-.45 1.1m-4-.9l-.55.95q-.4.35-.95.35l-.5-.05-.5-.25-.4-.35h-.05l-.05-.1-.35-.7Q4.3 9.1 3.55 9q-.65-.05-1.1.5Q2 9.95 2 10.55M10.35 12q-.55.2-.95.6-.4.35-.4.95 0 .55.35 1l.35.4.15.05.1.1.55.3.45.6.05.45q.1.7-.45 1.15-.35.35-.85.4"
    }, {
        _t: "path",
        fill: "none",
        stroke: "#cccccc",
        "stroke-width": .05,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M9.45 18h-2.1v-5.35H2V7.35h5.35V2h5.35v5.35H18V12.65h-5.3V18h-3"
    }]],
    use: ["0 0 15 8", [{
        _t: "path",
        fill: "none",
        stroke: "#FFFFFF",
        "stroke-width": 1,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M1 1v6h3v-6m5,1h-3v2.5h3v2.5h-3m8,0h-3v-5h3v2.5h-3"
    }]],
    trash: ["0 0 12 14", [{
        _t: "path",
        fill: "none",
        stroke: "#FFFFFF",
        "stroke-width": 1,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M1 3h10M2,3v10h8v-10M2.5,3l2,-2h3l2,2M4,5.5v5m2,0v-5m2,0v5"
    }]],
    arrowL: ["0 0 28 28", [{
        _t: "path",
        fill: "#94AEE1",
        stroke: "#94AEE1",
        "stroke-width": 8,
        "stroke-linecap": "none",
        "stroke-linejoin": "bevel",
        d: "M24 4L4 14 24 24 24 4 4 14"
    }]],
    arrowR: ["0 0 28 28", [{
        _t: "path",
        fill: "#94AEE1",
        stroke: "#94AEE1",
        "stroke-width": 8,
        "stroke-linecap": "none",
        "stroke-linejoin": "bevel",
        d: "M4 4L24 14 4 24 4 4 24 14"
    }]],
    arrowU: ["0 0 28 28", [{
        _t: "path",
        fill: "#94AEE1",
        stroke: "#94AEE1",
        "stroke-width": 8,
        "stroke-linecap": "none",
        "stroke-linejoin": "bevel",
        d: "M4 24L24 24 14 4 4 24 24 24"
    }]],
    arrowD: ["0 0 28 28", [{
        _t: "path",
        fill: "#94AEE1",
        stroke: "#94AEE1",
        "stroke-width": 8,
        "stroke-linecap": "none",
        "stroke-linejoin": "bevel",
        d: "M4 4L24 4 14 24 4 4 24 4"
    }]],
    whistle: ["0 0 32 32", [{
        _t: "path",
        fill: "#FFF",
        stroke: "#FFFFFF",
        "stroke-width": .1,
        d: "M8.2130202,17.4097165 C8.90995676,14.8678088 11.2368533,13 14,13 L15,13 L15,15 L18,15 L18,13 L28,13 L28,16 L19.8680255,17.742566 L19.8680255,17.742566 C19.9544954,18.1480563 20,18.5687141 20,19 C20,22.3137085 17.3137085,25 14,25 C11.2368533,25 8.90995676,23.1321912 8.2130202,20.5902835 C7.87655372,20.8473211 7.4561069,21 7,21 C5.8954305,21 5,20.1045695 5,19 C5,17.8954305 5.8954305,17 7,17 C7.4561069,17 7.87655372,17.1526789 8.2130202,17.4097165 L8.2130202,17.4097165 L8.2130202,17.4097165 Z M19,14 L27,14 L27,15.2000122 L18.5890081,17.0116026 C18.8534202,17.6210011 19,18.2933828 19,19 C19,21.7614237 16.7614237,24 14,24 C11.2385763,24 9,21.7614237 9,19 C9,16.5835588 10.7141872,14.5674875 12.9928784,14.1014691 C13.3181951,14.0349382 13.6550175,14 14,14 L14,16 L19,16 L19,14 L19,14 L19,14 Z M7,18 C6.44771525,18 6,18.4438648 6,19 C6,19.5522847 6.44386482,20 7,20 C7.55228475,20 8,19.5561352 8,19 C8,18.4477153 7.55613518,18 7,18 L7,18 Z M16,7 L16,11 L17,11 L17,7 L16,7 L16,7 Z M21.1196771,8.02099498 L19,11.4131874 L19.8480481,11.9431066 L21.9677252,8.55091425 L21.1196771,8.02099498 L21.1196771,8.02099498 Z M11.8480481,8.02099498 L13.9677252,11.4131874 L13.1196771,11.9431066 L11,8.55091425 L11.8480481,8.02099498 L11.8480481,8.02099498 Z"
    }]],
    iconParalysis: ["0 0 20 20", [{
        _t: "path",
        stroke: "#FFFFFF",
        fill: "none",
        d: "M0 4 L4 0 8 4 12 0 16 4 M0 8 L4 4 8 8 12 4 16 8 M0 12 L4 8 8 12 12 8 16 12 M0 16 L4 12 8 16 12 12 16 16"
    }]],
    plus: ["0 0 28 28", [{
        _t: "path",
        fill: "none",
        stroke: "#FFFFFF",
        "stroke-width": 8,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M14 4 L14 24 M4 14 L24 14"
    }]],
    triangle: ["0 0 24 24", [{
        _t: "path",
        fill: "none",
        stroke: "#FFFFFF",
        "stroke-width": 8,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M20 20 L4 20 12 4 20 20"
    }]],
    x: ["0 0 48 48", [{
        _t: "path",
        fill: "none",
        stroke: "#FFFFFF",
        "stroke-width": 16,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M40 8 L24 24 40 40 M24 24 L8 40 M8 8 L24 24"
    }]],
    menuV: ["-1 -1 8 10", [{
        _t: "path",
        fill: "none",
        stroke: "#FFFFFF",
        "stroke-width": 1,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M0 0 L6 0 6 8 0 8 0 0 M2 2 L4 2 M2 4 L4 4 M2 6 L4 6"
    }]],
    menuH: ["-1 -1 10 8", [{
        _t: "path",
        fill: "none",
        stroke: "#FFFFFF",
        "stroke-width": 1,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M0 0 L8 0 8 6 0 6 0 0 M2 2 L6 2 M2 4 L6 4"
    }]],
    iInv: ["-1 -1 21.5 21", [{
        _t: "path",
        fill: "none",
        stroke: "#FFFFFF",
        "stroke-width": 1.5,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M19 2.85 Q19.6 0.05 17.9 0 L17.85 0 16.65 0.25 16.1 0.55 15.7 0.9 14.65 0.45 14.95 1.65 13.6 2.95 12.25 2.45 12.7 3.85 11.3 5.2 9.75 4.65 10.35 6.2 9.7 7.1 9.25 7.75 9.45 7.95 11.5 9.95 12.8 9.1 13.15 8.85 14.6 9.15 14.15 7.9 15.85 6.15 17.35 6.55 16.8 5.2 16.8 5.15 18.25 3.7 19.5 3.95 19 2.9 19 2.85 M11.5 9.95 L12.05 10.45 14.7 13.05 Q17.65 16.15 19.4 19 16.5 17.35 13.25 14.4 L10.6 11.8 10.05 11.15 5.2 15.15 4.95 15.35 1.15 18.45 0.5 18.45 0.1 18 0.2 17.55 1.85 15.8 4.15 13.3 8 9.15 6.15 7.35 4.15 5.55 3.5 6.2 3.3 6 3 5.7 3.95 4.65 2.25 3.05 1.4 2.15 1.2 2.05 1.15 1.95 0.15 1.3 0.1 1.3 0 1.25 0.1 0.7 0.5 0.3 0.85 0.1 1.05 0.1 1.15 0.2 1.85 1.2 1.95 1.25 2.1 1.45 3.15 2.3 4.75 3.85 5.1 3.5 5.75 2.9 6.3 3.4 5.65 4.1 7.55 6.1 9.25 7.75 M10.05 11.15 L8.05 9.2 8 9.15"
    }]],
    iStats: ["0 0 21 21", [{
        _t: "path",
        fill: "none",
        stroke: "#FFFFFF",
        "stroke-width": 1.5,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M3.8 9.1 L3.8 3.8 9.1 3.8 9.1 9.1 3.8 9.1 M6.45 17.1 Q5.3 17.1 4.55 16.3 3.8 15.55 3.8 14.45 3.8 13.3 4.55 12.5 5.3 11.8 6.45 11.8 7.55 11.8 8.35 12.5 9.1 13.3 9.1 14.45 9.1 15.55 8.35 16.3 7.55 17.1 6.45 17.1 M11.8 17.1 L14.5 11.8 17.2 17.1 11.8 17.1 M20 1 L20 20 1 20 1 1 20 1"
    }]],
    iFist: ["-1 -1 22.0 21.5", [{
        _t: "path",
        fill: "none",
        stroke: "#FFFFFF",
        "stroke-width": 1.5,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M17.3 2.95 Q17.7 4.3 17.5 6.1 L17.6 6.35 17.9 4.8 17.9 4.75 18.2 6.45 18.2 8.35 18.25 9.4 18.45 10.4 18.75 11.1 19.55 14.4 Q19.65 15.35 19.15 16 18.25 17.15 16.7 17.65 15.55 18.05 14.55 18.65 13.85 19.05 12.85 19.05 11.45 19.1 11.7 17.65 L11.7 17.55 Q11.35 17.95 11.3 18.55 L11.25 18.55 10.2 18.05 10.15 18 10.15 16.1 10.15 16.05 Q9.3 15.35 8.05 15.2 L8 15.15 Q7.35 15.6 7.35 16.7 L7.3 16.7 Q6.65 15.6 7.6 15 L7.65 15 9.7 15.1 Q10.8 15 11.5 14.55 L15.25 14.9 Q16.1 14.8 16.55 14.2 L17.5 14.35 17.55 14.35 16.95 13.65 16.9 13.65 17.4 10.15 17.5 8.6 17.5 8.2 17.05 6.8 17.05 10.15 16.7 8 16.75 11.85 Q16.6 13.8 15.2 14.45 L14.7 14.55 13.25 14.5 12.15 14.05 12 13.85 11.95 13.5 12 12.1 12.1 10.55 12.1 10.5 12.3 5.55 Q11.9 7.2 11.75 9.05 L11.75 9.5 11.75 9.55 Q11.55 11 11.5 12.55 L11.45 13.25 11.25 13.85 Q10.85 14.45 9.7 14.7 L9.65 14.7 Q8.1 14.85 7.5 14.05 L7.4 12.75 7.4 11.35 7.4 8.4 7.4 6.4 7.4 5.8 7.2 6.6 7 13.45 Q7 14.45 6.2 14.65 4.35 15.05 3.65 13.7 L3.65 11.75 Q3.6 8.85 3.85 6.15 3.25 7.35 3.3 9.15 L3.35 12.7 Q3.35 13.65 3 14.3 L1.9 14.35 1.15 13.95 Q0.35 12.8 0.45 10.85 L0.6 9.5 0.65 8.9 Q0.5 6.35 1.45 4.65 1.75 4.05 2.4 3.75 L3.9 3.55 4.15 4.1 4.15 4.15 Q4.45 2.75 5.4 2 L7.25 1.8 8.2 1.95 Q8.1 2.35 8.15 2.9 L8.15 2.95 Q8.55 1.25 9.95 0.65 L11.8 0.55 Q12.6 0.8 13.05 1.4 L13.2 1.9 Q13.8 0.75 15.3 1.1 16.9 1.45 17.3 2.95 M18.35 4.75 Q18.85 6.35 18.8 8.5 18.8 9.5 19.05 10.3 L19.85 13.05 Q20.2 14.45 19.75 15.75 19.45 16.65 18.6 17.1 L14.45 19.15 Q12.75 19.85 11.1 19.1 L7.9 17.65 Q6.4 17 6.65 15.15 L4.25 15 3.65 14.6 Q2.45 15.3 1.25 14.6 -0.25 13.75 0.05 11.1 L0.1 10.4 0.3 6.55 Q0.55 3.65 3.1 3.15 4 2.95 4.45 2.4 4.9 1.8 5.65 1.5 L7.9 1.2 8.3 1.1 9.55 0.35 12.05 0.25 13.15 0.65 14.75 0.75 16.4 1.05 Q17.9 2.1 18.25 4.35 L18.35 4.75"
    }]],
    iChat: ["0 0 20 20", [{
        _t: "path",
        fill: "none",
        stroke: "#FFFFFF",
        "stroke-width": 1.5,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M1,1 L18,1 18,12 16,12 10,18 11,12, 1,12, 1,1"
    }]],
    iVault: ["0 0 18 18", [{
        _t: "path",
        fill: "none",
        stroke: "#fff",
        "stroke-width": 2,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M2 1H17V17H2V1M1 5H3.5M1 12H3.5M5.5,9a4,4 0 1,0 8,0a4,4 0 1,0 -8,0M8.5,9a1,1 0 1,0 2,0a1,1 0 1,0 -2,0"
    }]],
    cGod: ["0 0 284.2 479.7"],
    cBody1: ["0 0 210 500"],
    cBody2: ["0 0 200 500"],
    cAlchemist1: ["-2.5 -15.4 214.3 503.8"],
    cAlchemist2: ["3.8 21.9 176.1 316.4"],
    cBarbarian1: ["0.1 -6.8 207 322"],
    cBarbarian2: ["41.0 29.3 106.1 273.8"],
    cFighter1: ["34.6 -24.1 174.8 505.6"],
    cFighter2: ["24.6 3.1 179.3 499.8"],
    cGuardian1: ["-1.4 -3.3 222.5 493.5"],
    cGuardian2: ["2.7 28.9 201.3 478.6"],
    cHeadhunter1: ["-9.7 -11.8 230.0 496.4"],
    cHeadhunter2: ["-6.0 19.6 205.6 484.4"],
    cMagician1: ["-18.6 -4.7 233.4 496.3"],
    cMagician2: ["-28.8 26.9 229.3 323.1"],
    cMonk1: ["-0.7 0 208.8 452.6"],
    cMonk2: ["4.2 32.5 175.6 383.8"],
    cNinja1: ["34.8 -1.4 173.1 489.4"],
    cNinja2: ["11.4 29.4 189.8 472.3"],
    cPaladin1: ["-4.3 -2.8 220.1 497.6"],
    cPaladin2: ["2.0 28.9 205.3 482.6"],
    cRogue1: ["-6.6 -4.2 215.8 487.6"],
    cRogue2: ["17.2 28.6 184.7 473.1"],
    cSamurai1: ["29.7 -46.0 176.2 530.3"],
    cSamurai2: ["39.6 -4.8 162.4 509.6"],
    cWarlock1: ["-24.9 2.7 261.1 493.2"],
    cWarlock2: ["-55.6 19.8 255.4 479.7"],
    cChainmail1: ["0 0 190.7 303"],
    cChainmail2: ["0 0 154.7 269.7"],
    cLeather1: ["0 0 156.1 202.8"],
    cLeather2: ["0 0 141.7 219.3"],
    cPaddedrobe1: ["0 0 208.8 258.5"],
    cPaddedrobe2: ["0 0 151.9 206.1"],
    cPlatemail1: ["0 0 188 235.8"],
    cPlatemail2: ["0 0 145.5 226.9"],
    cRobe1: ["0 0 189.1 338.8"],
    cRobe2: ["0 0 155.9 291.8"],
    cScale1: ["0 0 190.6 233.3"],
    cScale2: ["0 0 160.2 227.5"],
    wm0: ["-16.2 124.8 195.0 193.2"],
    wm1: ["-13.8 148.2 174.3 166.2"],
    wm10: ["-46.1 27.8 476.9 313.6"],
    wm2: ["-27.6 135.4 244.3 194.3"],
    wm3: ["-59.9 262.9 105.5 99.1"],
    wm4: ["-72.5 57 346.9 306.9"],
    wm5: ["-25.4 27.3 310.1 305.9"],
    wm6: ["-37 100.8 231.8 242.5"],
    wm7: ["-47 61.3 334.3 287.4"],
    wm8: ["-115.8 -12.4 485.4 418.9"],
    wm9: ["-116.9 9.4 463.4 397.1"],
    iconArena: ["0 0 96.4 55.7"],
    iconCatacombs: ["0 0 58.9 27.7"],
    iconKitchen: ["0 0 50.2 49.0"],
    iconLake: ["1.3 -1.1 799.0 515.0"],
    iconMarket: ["0 0 302.4 175.8"],
    iconMQ: ["0 0 153.3 198.7"],
    iconShrine: ["0 0 63 60.9"],
    iconSkillCenter: ["0 0 26.1 64.0"],
    iconSkillLeft: ["0 0 41.6 62.9"],
    iconSkillRight: ["0 0 41.0 63.2"],
    iconVault: ["0 0 74.3 58.4"],
    iconKey: ["0 0 17.6 58.0", [{
        _t: "linearGradient",
        gradientUnits: "userSpaceOnUse",
        x1: -819.2,
        x2: 819.2,
        spreadMethod: "pad",
        gradientTransform: "matrix(0.0057525634765625 0 0 0.024993896484375 11.25 21.1)",
        id: "gradient0",
        _c: [{
            _t: "stop",
            offset: 0
        }, {
            _t: "stop",
            offset: .24705882352941178,
            "stop-color": "#969696"
        }, {
            _t: "stop",
            offset: 1
        }]
    }, {
        _t: "radialGradient",
        gradientUnits: "userSpaceOnUse",
        r: 819.2,
        cx: 0,
        cy: 0,
        spreadMethod: "pad",
        gradientTransform: "matrix(0.0137176513671875 0 0 0.0137176513671875 9 49.65)",
        id: "gradient1",
        _c: [{
            _t: "stop",
            offset: 0
        }, {
            _t: "stop",
            offset: .615686274509804,
            "stop-color": "#646464"
        }, {
            _t: "stop",
            offset: 1
        }]
    }, {
        _t: "path",
        stroke: "none",
        fill: "#000000",
        d: "M10.25 4.85 L12.2 4.85 12.2 5.3 13.9 5.3 13.9 5.9 12.65 5.9 12.65 5.45 10.25 5.45 10.25 4.85 M14.35 7.5 L15.5 7.5 15.5 8.1 14.35 8.1 14.35 7.5 M10.65 40.9 Q12.9 41.4 14.6 43.1 L15.75 44.5 15.05 43.75 Q13.15 41.85 10.65 41.4 L10.65 40.9 M1.85 54.2 Q0 52 0 49.05 0 45.6 2.5 43.1 4.25 41.35 6.55 40.85 L6.55 40.55 6.75 40.55 6.75 12.7 7.2 12.7 7.2 41.15 7 41.15 7 41.45 Q4.7 41.95 2.95 43.75 0.45 46.2 0.45 49.65 0.45 52.2 1.85 54.2 M6.55 12.1 L6.1 12.1 6.1 0 9.8 0 9.8 0.6 6.55 0.6 6.55 12.1 M13.95 46.3 Q15.2 47.8 15.2 49.75 15.2 52.05 13.45 53.7 11.65 55.3 9.1 55.35 6.55 55.3 4.8 53.7 L3.8 52.55 4.35 53.1 Q6.1 54.7 8.65 54.75 11.2 54.7 13 53.1 14.75 51.45 14.75 49.15 14.75 47.55 13.95 46.3"
    }, {
        _t: "path",
        stroke: "none",
        fill: "url(#gradient0)",
        d: "M10.25 4.85 L10.25 5.45 12.65 5.45 12.65 5.9 13.9 5.9 14.35 5.9 14.35 7.5 14.35 8.1 15.5 8.1 15.95 8.1 15.95 11.2 12.65 11.2 12.65 12.9 10.65 12.9 10.65 40.9 10.65 41.4 9 41.25 7 41.45 7 41.15 7.2 41.15 7.2 12.7 6.75 12.7 6.55 12.7 6.55 12.1 6.55 0.6 9.8 0.6 10.25 0.6 10.25 4.85"
    }, {
        _t: "path",
        stroke: "none",
        fill: "url(#gradient1)",
        d: "M15.75 44.5 Q17.6 46.7 17.6 49.65 17.6 53.1 15.05 55.55 12.55 58.05 9 58.05 5.45 58.05 2.95 55.55 L1.85 54.2 Q0.45 52.2 0.45 49.65 0.45 46.2 2.95 43.75 4.7 41.95 7 41.45 L9 41.25 10.65 41.4 Q13.15 41.85 15.05 43.75 L15.75 44.5 M13.95 46.3 L13.45 45.8 Q11.65 44.15 9.1 44.15 6.55 44.15 4.8 45.8 3 47.4 3 49.75 3 51.3 3.8 52.55 L4.8 53.7 Q6.55 55.3 9.1 55.35 11.65 55.3 13.45 53.7 15.2 52.05 15.2 49.75 15.2 47.8 13.95 46.3"
    }]]
}
  , Town = {
    show: function() {
        if (-1 != Plr.c[5]) {
            clearBG();
            var t, e, s, a, i = [["iconMarket", "Marketplace", 238.1, 105.5, 132.6, 77, Mkt.tog], ["iconCatacombs", "Catacombs", 514.2, 233.3, 110.8, 52.1, Cata.click], ["iconShrine", "Shrine", 223.7, 204.9, 124, 119.8, Shrine.tog], ["iconVault", "Item Vault", 181, 21.7, 94.9, 74.5, Vlt.tog], ["iconLake", "Fishing Pond", 521, 126.3, 107.9, 69.5, showLake], ["iconKitchen", "Cooking", 430, 110.8, 50.2, 49, showBakery], ["iconSkillLeft", "Transmuting", 455, -15.5, 72.8, 110.075, showTransmuting, 1], ["iconSkillCenter", "Glyphing", 510, -16.6, 26.1 * 1.75, 112, showGlyphing, 1], ["iconSkillRight", "Suffusencing", 545.5, -15, 71.75, 63.2 * 1.75, showSuffusencing, 1]], o = [["iconGroup", "Group Tools", Grp.tog], ["iconSettings", "Settings", Settings.tog], ["iconLadder", "View Ladders", Ladder.tog], ["iconLogOut", "Log Out", Town.clkLogout]], r = 0;
            for (Plr.c[6] >= 71 + 2 * CStats.classData[Plr.c[5]][1] && i.push(["iconMQ", "Master Quest", 361.3, 180.3, 115.7, 149.9, MQ.show]),
            e = CE("div", bg, "townWrap"),
            t = 0; t < i.length; t++)
                s = i[t][7] ? r = r || CE("div", e, "townObjWrap") : e,
                (s = CE("div", s, "townOption")).id = "townObj" + t,
                a = svgs[i[t][0]][0].split(" "),
                s.svg = cS(s, {
                    s: "svg/" + i[t][0] + ".svg",
                    w: a[2],
                    h: a[3],
                    c: "townOIcon"
                }),
                s.t = CTD(s, i[t][1], "townOLabel"),
                aE(s, evt.MC, i[t][6]);
            for (bg.bcb = CE("div", bg, "ctrlButtons"),
            t = 0; t < o.length; t++)
                CSB(bg.bcb, {
                    s: "svg/" + o[t][0] + ".svg",
                    c: "",
                    cb: o[t][2],
                    tip: o[t][1],
                    tipY: !0
                })
        }
    },
    clkLogout: function() {
        njs.sendBytes(5, 6)
    }
}
  , Vlt = {
    tab: 0,
    c: ["No Category", "Melee", "Caster", "Healing", "Regen", "Magic Luck", "Glyphables", "Transmutables", "Wellables", "Shrinables", "Sellables", "Misc 1", "Misc 2", "Misc 3"],
    get: function() {
        return pops.o[8]
    },
    tog: function() {
        if (e = Vlt.get())
            return e.del();
        if (!(e = Skill.get()) || !e.started) {
            (e = new Popup(8,-1,-1,"")).slotsPer = 25,
            e.daysPer = 30,
            e.minExpandDays = 21,
            e.maxSlots = 1e5,
            e.guildDays = 7,
            e.items = {},
            e.tbc = new Radio(e.o,{
                c: "vaultTabs",
                oc: Vlt.clkTab
            });
            var t, e, s = [["Vault", Vlt.showManage], ["Withdraw", Vlt.showWithdraw], ["Deposit", Vlt.showDeposit], ["Transfer", Vlt.showTransfer]];
            for (e.tbc.tabs = new Array(s.length),
            t = 0; t < s.length; t++)
                e.tbc.tabs[t] = e.tbc.add(s[t][0], t),
                e.tbc.tabs[t].cb = s[t][1];
            var a = CE("div", e.o, "vltWrap")
              , a = (e.controls = CE("div", a, "vltControls"),
            CE("div", a, "vltRes"));
            e.spc = CE("div", a, "vltItemsBox"),
            e.foot = CE("div", a, "vltFoot"),
            e.vPageW = CE("div", e.foot, "vPagewrap"),
            e.vPrev = CAB({
                p: e.vPageW,
                c: "abutGradBl vPages",
                v: "< Prev",
                oc: function(t) {
                    var e;
                    Fld.G("V") || (e = Vlt.get().controls,
                    Vlt.doSearch(e.page - 1))
                }
            }),
            e.vCount = CTD(e.vPageW, "", "vSearchCount"),
            e.vNext = CAB({
                p: e.vPageW,
                c: "abutGradBl vPages",
                v: "Next >",
                oc: function(t) {
                    var e;
                    Fld.G("V") || (e = Vlt.get().controls,
                    Vlt.doSearch(e.page + 1))
                }
            }),
            e.itemSum = CTD(e.foot, Vlt.data ? Vlt.data[0] + " / " + Vlt.data[1] + " Items" : "0 / 0 Items", "vItemCount"),
            e.tbc.select(e.tbc.tabs[Vlt.tab]),
            Vlt.data || njs.sendBytes(25, 1)
        }
    },
    clkTab: function(t) {
        var e = Vlt.get();
        if (e && e.tab != t.value)
            return Vlt.tab = e.tab = t.value,
            dAC(e.controls),
            e.controls.w = e.controls.offsetWidth,
            e.o.classList.remove("mkHide"),
            e.vPageW.style.visibility = e.vPrev.style.visibility = e.vNext.style.visibility = "hidden",
            Vlt.clear(),
            !(0 < t.value) || Vlt.data && Vlt.data[2] ? (e.o.classList.remove("vTabVault", "vTabWithdraw", "vTabDeposit", "vTabTransfer"),
            e.o.classList.add("vTab" + t.t.nodeValue),
            t.cb(e),
            2 == t.value || void 0) : Vlt.showNoSub(e.controls)
    },
    clear: function() {
        var t = Vlt.get();
        t && (dAC(t.spc),
        t.spc.items = null,
        t.items = {},
        t.results = [],
        t.viewing && t.o.removeChild(t.viewing),
        t.prev && t.o.removeChild(t.prev),
        t.next && t.o.removeChild(t.next),
        t.viewing = t.prev = t.next = null)
    },
    showManage: function(t) {
        var e, s, a, i, o = Vlt.data;
        o && (dAC(t.controls),
        i = "None",
        o[2] && (i = Math.floor(o[2] / 86400)) < 1 && (i = "< 1"),
        e = t.daysPer,
        o[2] ? (e += " more",
        s = o[1] / t.slotsPer) : ((s = Math.floor(o[0] / t.slotsPer)) < 1 || s * t.slotsPer < o[0]) && ++s,
        i = [{
            e: "div",
            cl: "vStatsWrap",
            txt: t.slotsPer + " storage slots for " + t.daysPer + " days for " + o[5],
            c: a = [{
                e: "img",
                s: "svg/iconGold.svg"
            }]
        }, {
            e: "div",
            cl: "vStatsWrap vStatsLabs",
            c: [{
                e: "label",
                txt: "Total Items in Vault:"
            }, {
                e: "label",
                txt: o[0]
            }]
        }, {
            e: "div",
            cl: "vStatsWrap vStatsLabs",
            c: [{
                e: "label",
                txt: "Current Rental Slots:"
            }, {
                e: "label",
                txt: o[1]
            }]
        }, {
            e: "div",
            cl: "vStatsWrap vStatsLabs",
            c: [{
                e: "label",
                txt: "Days Left:"
            }, {
                e: "label",
                txt: i
            }]
        }, {
            e: "div",
            cl: "vStatsWrap vStatsBuyL",
            txt: "Rent " + e + " days for " + s * o[5],
            c: a
        }, {
            e: "div",
            cl: "vStatsWrap",
            c: [{
                e: "input",
                t: "password",
                po: "gpwdRent",
                ph: "Gold Password"
            }, {
                e: "input",
                t: "button",
                cl: "abutGradBl",
                v: "Buy Days",
                ev: [evt.MC, function(t) {
                    var e = this.parentNode.gpwdRent;
                    njs.sendData([1, 25, 1, 9, 100, rcgp(e.value)]),
                    e.value = ""
                }
                ]
            }]
        }],
        o[2] && o[2] / 86400 >= t.minExpandDays && o[1] < t.maxSlots && i.push({
            e: "div",
            cl: "vStatsWrap vStatsBuyL",
            txt: "Expand Box to " + (o[1] + 25) + " slots for " + Math.round(100 * o[4]) / 100,
            c: a
        }, {
            e: "div",
            cl: "vStatsWrap",
            c: [{
                e: "input",
                t: "password",
                po: "gpwdExpand",
                ph: "Gold Password"
            }, {
                e: "input",
                t: "button",
                cl: "abutGradBl",
                v: "Buy Slots",
                ev: [evt.MC, function(t) {
                    var e = this.parentNode.gpwdExpand;
                    njs.sendData([1, 25, 1, 8, 100, rcgp(e.value)]),
                    e.value = ""
                }
                ]
            }]
        }),
        mEa(t.controls, i))
    },
    setStats: function() {
        var t = Vlt.get();
        t && (t.itemSum.t.nodeValue = Vlt.data[0] + " / " + Vlt.data[1] + " Items",
        0 === t.tab) && Vlt.showManage(t)
    },
    showNoSub: function(t) {
        CE("div", t, "vltErr").innerHTML = "Using the Item Vault requires a monthly rental charge. Please click the Manage button and rent some slots before using this page."
    },
    gc: function() {
        return Vlt.uc || Vlt.c
    },
    showWithdraw: function(t) {
        Inv.setTab(1);
        var e, s, a = t.controls, t = [{
            e: "div",
            cl: "mkCtrlWrap",
            c: [{
                e: "label",
                txt: "Category:"
            }, {
                e: "select",
                po: "cats",
                poup: 1,
                sd: Vlt.gc(),
                sbfe: 1
            }]
        }, {
            e: "div",
            cl: "mkCtrlWrap",
            c: [{
                e: "label",
                txt: "Type:"
            }, {
                e: "select",
                po: "itemCat",
                poup: 1,
                sd: Items.types,
                sbfe: 1,
                ev: ["change", function(t) {
                    Mkt.setBuyType(this.selectedIndex - 1, Vlt.get)
                }
                ]
            }]
        }, {
            e: "div",
            cl: "mkCtrlWrap",
            c: [{
                e: "select",
                po: "typeF",
                poup: 1
            }]
        }, {
            e: "div",
            cl: "mkCtrlWrap mkCtrlSmall",
            c: [{
                e: "label",
                txt: "Level Range:"
            }, {
                e: "select",
                po: "lvl",
                poup: 1,
                poi: 0,
                poim: 2,
                sbfe: 1
            }, {
                txt: "to"
            }, {
                e: "select",
                po: "lvl",
                poup: 1,
                poi: 1,
                sbfe: 1
            }]
        }, {
            e: "div",
            cl: "mkCtrlWrap mkCtrlSmall",
            c: [{
                e: "label",
                txt: "Magic Level:"
            }, {
                e: "select",
                po: "mag",
                poup: 1,
                poi: 0,
                poim: 2,
                sbfe: 1,
                sd: Items.magical
            }, {
                txt: "to"
            }, {
                e: "select",
                po: "mag",
                poup: 1,
                poi: 1,
                sbfe: 1,
                sd: Items.magical
            }]
        }];
        for (t.push({
            e: "div",
            cl: "mkCtrlBWrap",
            c: [{
                e: "input",
                t: "button",
                cl: "abutGradBl",
                v: "Search",
                ev: [evt.MC, function(t) {
                    this.parentNode;
                    Vlt.doSearch(0),
                    eSP(t)
                }
                ]
            }]
        }),
        mEa(a, t),
        a.typeS = -1,
        s = 0; s < 2; s++) {
            for (e = 0; e < Items.materials[5].length; e++)
                sbAdd(a.lvl[s], Items.materials[5][e] + " (" + (e < 3 ? 0 : 5 * e - 10) + ")", e);
            a.mag[s].options[1].text = "Normal"
        }
        mSVG(a, {
            n: svgs.menuH,
            c: "mkArrow",
            ov: [[0, "stroke", "#FFF"], [0, "stroke-width", .25]]
        }),
        aE(a, evt.MC, function(t) {
            var e = Vlt.get().o;
            e.classList.contains("mkHide") && (e.classList.remove("mkHide"),
            eSP(t))
        })
    },
    doSearch: function(t) {
        var e, s, a, i, o, r, l = Vlt.get();
        l && l.controls && (l.o.classList.add("mkHide"),
        s = (e = l.controls).lvl[0].selectedIndex - 1,
        a = e.lvl[1].selectedIndex - 1,
        i = e.mag[0].selectedIndex - 1,
        o = e.mag[1].selectedIndex - 1,
        (a = -1 == a ? Items.materials[5].length - 1 : a) < (s = -1 == s ? 0 : s) && (a = s),
        (o = -1 == o ? Items.magical.length - 1 : o) < (i = -1 == i ? 0 : i) && (o = i),
        r = e.typeF && 0 != e.typeF.selectedIndex ? e.typeF.value : 0,
        t = [1, 25, 1, 11, 1, e.page = t, 1, e.cats.selectedIndex - 1, 1, e.itemCat.selectedIndex - 1, 3, r, 1, s, 1, a, 1, i, 1, o],
        Vlt.clear(),
        CE("div", l.spc, "ladLoad").innerHTML = "Loading...",
        Fld.A("V", "S", 1e3, Vlt, t, 1))
    },
    finishSearch: function(t) {
        var e, s, a = Vlt.get();
        if (a) {
            e = 0,
            a.spc.items = [],
            dAC(a.spc);
            for (var i = 0; i < a.results.length; i++)
                s = a.results[i],
                a.spc.items[s] = new Item(a.spc,a.items[s],0,0,{
                    ctrlCustom: "vaw",
                    compareEQ: 1,
                    ccB1: 25,
                    ccB2: 4
                }),
                a.items[s][3] && a.spc.items[s].setCat(Vlt.gc()[a.items[s][3]]),
                e++;
            e || (CE("div", a.spc, "ladLoad").innerHTML = "No items found.");
            var o = Math.ceil(t / 50);
            a.vCount.t.nodeValue = e + " of " + t + " (Page " + (a.controls.page + 1) + " of " + o + ")",
            a.vPrev.style.visibility = 0 < a.controls.page ? "visible" : "hidden",
            a.vNext.style.visibility = 50 < t && a.controls.page < Math.floor(t / 50) ? "visible" : "hidden",
            a.vPageW.style.visibility = "visible"
        }
    },
    delItem: function(t) {
        var e = Vlt.get();
        e && (e.spc.items[t].del(),
        delete e.spc.items[t],
        delete e.items[t],
        Vlt.data[0]--)
    },
    getItem: function(t, e) {
        Sound.item();
        var s = Vlt.get();
        s && s.items[t] ? (s.items[t][0] = e,
        Plr.items[e] = s.items[t],
        Plr.items[e][1] = Plr.char,
        Plr.items[e][3] = 0,
        Vlt.delItem(t),
        Inv.addItem(e)) : njs.sendData([1, 6, 1, 0, 8, e])
    },
    clearItem: function(t) {
        var e = Vlt.get();
        e && e.item && e.item.icon && e.item.icon.i == t && e.item.clear()
    },
    doDepositItem: function() {
        var t, e = Vlt.get();
        e && e.item && e.item.icon && (t = Vlt.vaultDepCat,
        njs.sendData([1, 25, 1, 6, 8, e.item.icon.i, 1, t]))
    },
    showDeposit: function(t) {
        Inv.setTab(1);
        var e = CTD(t.controls, "?", "mkSellHelp");
        aE(e, "mouseover", function(t) {
            this.tip = new Tip(this,t),
            CTD(this.tip.o, ["You can store any equipment or items in the Item Vault.", "", "Drag the item you wish to store onto the item box shown, and optionally choose a category to assign it to.", "", "Click the Deposit Item button to deposit the item(s)."], "tipHelp"),
            this.tip.finish()
        }),
        aE(e, "mouseout", function(t) {
            this.tip = this.tip.del()
        }),
        e = [{
            e: "div",
            cl: "vDepWrap",
            c: [{
                e: "label",
                txt: "Category:"
            }, {
                e: "select",
                id: "vltCat",
                poup: 2,
                sd: Vlt.gc(),
                ev: ["change", function(t) {
                    Vlt.vaultDepCat = this.selectedIndex
                }
                ]
            }]
        }, {
            e: "div",
            cl: "vDepWrap",
            po: "itemD"
        }, {
            e: "div",
            cl: "vDepWrap",
            c: [{
                e: "input",
                t: "button",
                cl: "abutGradBl vDepB",
                v: "Deposit Item",
                ev: [evt.MC, Vlt.doDepositItem]
            }]
        }],
        mEa(t.spc, e),
        Vlt.vaultDepCat && (gi("vltCat").selectedIndex = Vlt.vaultDepCat),
        t.item = new ItemSlot(t.spc.itemD,{
            ctrlClear: !0,
            params: {
                compareEQ: 1
            },
            drop: function(t, e) {
                Plr.autoxfer && Vlt.doDepositItem()
            }
        })
    },
    doXferItem: function() {
        var t, e = Vlt.get();
        e.item.icon && e.gvals[0] && e.gvals[1] && (t = gi("xferId")) && (t = parseInt(t.value),
        isNaN(t) || t == njs.uid || njs.sendData([1, 25, 1, 7, 8, e.item.icon.i, 8, t]))
    },
    showTransfer: function(t) {
        Inv.setTab(1);
        var e = !1
          , s = (t.gvals ? e = !0 : njs.sendBytes(25, 2),
        [{
            e: "div",
            cl: "vStatsWrap vStatsLabs",
            c: [{
                e: "label",
                txt: "Your Guild Vault #:"
            }, {
                e: "label",
                txt: njs.uid
            }]
        }, {
            e: "div",
            cl: "vStatsWrap vStatsLabs",
            c: [{
                e: "label",
                txt: "Guild Transfer Days Left:"
            }, {
                e: "label",
                txt: ".",
                po: "guildXferDays",
                poup: 1
            }]
        }, {
            e: "div",
            cl: "vStatsWrap vXferBlock",
            c: [{
                e: "input",
                t: "checkbox",
                id: "vXferBIIT",
                chk: Vlt.data[3],
                ev: [evt.MC, Vlt.clickBlockRX]
            }, {
                e: "label",
                lFor: "vXferBIIT",
                txt: "Block Incoming Item Transfers"
            }]
        }, {
            e: "div",
            cl: "vStatsWrap vStatsBuyL",
            txt: "Buy " + t.guildDays + " days of guild transfers for " + Vlt.data[6],
            c: [{
                e: "img",
                s: "svg/iconGold.svg"
            }]
        }, {
            e: "div",
            cl: "vStatsWrap",
            c: [{
                e: "input",
                t: "password",
                po: "gpwd",
                ph: "Gold Password"
            }, {
                e: "input",
                t: "button",
                cl: "abutGradBl",
                v: "Buy Days",
                ev: [evt.MC, function(t) {
                    var e = this.parentNode.gpwd;
                    njs.sendData([1, 25, 1, 10, 100, rcgp(e.value)]),
                    e.value = ""
                }
                ]
            }]
        }])
          , s = (mEa(t.controls, s),
        s = [{
            e: "div",
            cl: "vStatsWrap vXferTV",
            c: [{
                e: "div",
                po: "itemD",
                poup: 1
            }, {
                e: "input",
                t: "text",
                v: Vlt.vaultXferId || "",
                ml: 8,
                id: "xferId",
                poup: 2,
                ph: "Recipient Vault #"
            }]
        }, {
            e: "div",
            cl: "vStatsWrap",
            c: [{
                e: "input",
                t: "button",
                cl: "abutGradBl vXferB",
                v: "Transfer Item",
                ev: [evt.MC, Vlt.doXferItem]
            }]
        }, {
            e: "div",
            cl: "vStatsWrap",
            c: [{
                e: "div",
                txt: "?",
                cl: "mkSellHelp",
                id: "vltXH"
            }]
        }],
        mEa(t.spc, s),
        gi("xferId").onchange = function(t) {
            Vlt.vaultXferId = this.value
        }
        ,
        t.item = new ItemSlot(t.spc.itemD,{
            ctrlClear: !0,
            params: {
                compareEQ: 1
            },
            drop: function(t, e) {
                Plr.autoxfer && Vlt.doXferItem()
            }
        }),
        gi("vltXH"));
        aE(s, "mouseover", function(t) {
            this.tip = new Tip(this,t),
            CTD(this.tip.o, ["To transfer an item to another guild-mate, enter their Vault #, drag the item to the box, then click Transfer Item.", "", "*** Please note that all transfers are at your own risk. This is a one way transfer, and the receiver is not obligated to give you anything in return."], "tipHelp"),
            this.tip.finish()
        }),
        aE(s, "mouseout", function(t) {
            this.tip = this.tip.del()
        }),
        e && Vlt.drawGuildStats(t)
    },
    clickBlockRX: function(t) {
        var e = gi("vXferBIIT").checked ? 1 : 0;
        njs.sendBytes(25, 3, e),
        Vlt.data[3] = e
    },
    drawGuildStats: function(t) {
        var e = "None";
        t.gvals[1] && (e = Math.floor(t.gvals[1] / 86400)) < 1 && (e = "< 1"),
        t.controls.guildXferDays.t.nodeValue = e
    },
    setGuildStats: function(t, e) {
        var s = Vlt.get();
        s && (s.gvals = [t, e],
        3 == s.tab) && Vlt.drawGuildStats(s)
    },
    addItem: function(t, e) {
        var s = {}
          , t = Items.add(s, t, e)
          , e = Vlt.get();
        e && (e.results.push(t),
        e.items[t] = s[t])
    },
    reset: function() {
        Vlt.tab = Vlt.vaultDepCat = Vlt.vaultXferId = Vlt.data = 0
    },
    itemRx: function(t) {
        var e = [t[0], 0, 0, 0, t[1], t[2], t[3], t[4]];
        Log.add("*" + t[5] + " sent [" + Items.getName(e) + "] to your vault.")
    }
};
