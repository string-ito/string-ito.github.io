var initNum = () => {
    return {
        w1r1c1: 1,
        w1r1c2: 4,
        w1r2c1: 6,
        w1r2c2: 3,
        w2r1c1: 1,
        w2r1c2: 3,
        w2r2c1: 4,
        w2r2c2: 6,
        w3r1c1: 5,
        w3r1c2: 2,
        w3r2c1: 2,
        w3r2c2: 5,
        w4r1c1: 5,
        w4r1c2: 2,
        w4r2c1: 2,
        w4r2c2: 5,
        w5r1c1: 3,
        w5r1c2: 1,
        w5r2c1: 6,
        w5r2c2: 4,
        w6r1c1: 4,
        w6r1c2: 1,
        w6r2c1: 3,
        w6r2c2: 6,
    };
}

var app = new Vue({
    el: "#app",
    data: {
        n: initNum(),
        c: false
    },
    methods: {
        b1: function() {
            var n = this.n;
            var current1 = n.w1r1c1;
            n.w1r1c1 = n.w2r1c1;
            n.w2r1c1 = n.w6r1c1;
            n.w6r1c1 = n.w5r1c1;
            n.w5r1c1 = current1;

            var current2 = n.w1r2c1;
            n.w1r2c1 = n.w2r2c1;
            n.w2r2c1 = n.w6r2c1;
            n.w6r2c1 = n.w5r2c1;
            n.w5r2c1 = current2;

            var current3 = n.w3r1c1;
            n.w3r1c1 = n.w3r2c1;
            n.w3r2c1 = n.w3r2c2;
            n.w3r2c2 = n.w3r1c2;
            n.w3r1c2 = current3;
        },
        b2: function() {
            var n = this.n;
            var current = n.w1r1c2;
            n.w1r1c2 = n.w2r1c2;
            n.w2r1c2 = n.w6r1c2;
            n.w6r1c2 = n.w5r1c2;
            n.w5r1c2 = current;

            var current2 = n.w1r2c2;
            n.w1r2c2 = n.w2r2c2;
            n.w2r2c2 = n.w6r2c2;
            n.w6r2c2 = n.w5r2c2;
            n.w5r2c2 = current2;

            var current4 = n.w4r1c1;
            n.w4r1c1 = n.w4r1c2;
            n.w4r1c2 = n.w4r2c2;
            n.w4r2c2 = n.w4r2c1;
            n.w4r2c1 = current4;
        },
        b3: function() {
            var n = this.n;
            var current = n.w1r1c1;
            n.w1r1c1 = n.w3r1c1;
            n.w3r1c1 = n.w6r2c2;
            n.w6r2c2 = n.w4r1c1;
            n.w4r1c1 = current;

            var current2 = n.w1r1c2;
            n.w1r1c2 = n.w3r1c2;
            n.w3r1c2 = n.w6r2c1;
            n.w6r2c1 = n.w4r1c2;
            n.w4r1c2 = current2;

            var current4 = n.w2r1c1;
            n.w2r1c1 = n.w2r1c2;
            n.w2r1c2 = n.w2r2c2;
            n.w2r2c2 = n.w2r2c1;
            n.w2r2c1 = current4;
        },
        b4: function() {
            var n = this.n;
            var current = n.w1r2c1;
            n.w1r2c1 = n.w3r2c1;
            n.w3r2c1 = n.w6r1c2;
            n.w6r1c2 = n.w4r2c1;
            n.w4r2c1 = current;

            var current2 = n.w1r2c2;
            n.w1r2c2 = n.w3r2c2;
            n.w3r2c2 = n.w6r1c1;
            n.w6r1c1 = n.w4r2c2;
            n.w4r2c2 = current2;

            var current3 = n.w5r1c1;
            n.w5r1c1 = n.w5r2c1;
            n.w5r2c1 = n.w5r2c2;
            n.w5r2c2 = n.w5r1c2;
            n.w5r1c2 = current3;
        },
        initialize: function() {
            this.n = initNum();
        },
        cw1: function() {
            var n = this.n;
            return n.w1r1c1 === n.w1r1c2 &&
                n.w1r1c1 === n.w1r2c1 &&
                n.w1r1c1 === n.w1r2c2;
        },
        cw2: function() {
            var n = this.n;
            return n.w2r1c1 === n.w2r1c2 &&
                n.w2r1c1 === n.w2r2c1 &&
                n.w2r1c1 === n.w2r2c2;
        },
        cw3: function() {
            var n = this.n;
            return n.w3r1c1 === n.w3r1c2 &&
                n.w3r1c1 === n.w3r2c1 &&
                n.w3r1c1 === n.w3r2c2;
        },
        cw4: function() {
            var n = this.n;
            return n.w4r1c1 === n.w4r1c2 &&
                n.w4r1c1 === n.w4r2c1 &&
                n.w4r1c1 === n.w4r2c2;
        },
        cw5: function() {
            var n = this.n;
            return n.w5r1c1 === n.w5r1c2 &&
                n.w5r1c1 === n.w5r2c1 &&
                n.w5r1c1 === n.w5r2c2;
        },
    },
    computed: {
        num1: function() {
            return this.n.w1r1c1 + this.n.w1r1c2 + this.n.w1r2c1 + this.n.w1r2c2;
        },
        num2: function() {
            return this.n.w2r1c1 + this.n.w2r1c2 + this.n.w2r2c1 + this.n.w2r2c2;
        },
        num3: function() {
            return this.n.w3r1c1 + this.n.w3r1c2 + this.n.w3r2c1 + this.n.w3r2c2;
        },
        num4: function() {
            return this.n.w4r1c1 + this.n.w4r1c2 + this.n.w4r2c1 + this.n.w4r2c2;
        },
        num5: function() {
            return this.n.w5r1c1 + this.n.w5r1c2 + this.n.w5r2c1 + this.n.w5r2c2;
        },
        w1c: function() {
            return this.cw1() ? "c" + this.n.w1r1c1.toString() : "";
        },
        w2c: function() {
            return this.cw2() ? "c" + this.n.w2r1c1.toString() : "";
        },
        w3c: function() {
            return this.cw3() ? "c" + this.n.w3r1c1.toString() : "";
        },
        w4c: function() {
            return this.cw4() ? "c" + this.n.w4r1c1.toString() : "";
        },
        w5c: function() {
            return this.cw5() ? "c" + this.n.w5r1c1.toString() : "";
        }
    },
    watch: {
        n: {
            handler: function() {
                if (!this.c && this.cw1() && this.cw2() && this.cw3() && this.cw4() && this.cw5()) {
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