// N = 0° || 360°
// E = 90°
// W = 180°
// S = 270°
var CardinalDirections;
(function (CardinalDirections) {
    CardinalDirections["North"] = "N";
    CardinalDirections["East"] = "E";
    CardinalDirections["West"] = "W";
    CardinalDirections["South"] = "S";
})(CardinalDirections || (CardinalDirections = {}));
var Aspirateur = /** @class */ (function () {
    function Aspirateur(
    // Params
    x, y, orientation, rotationDegree, moveStep, gridSize, instructions) {
        if (x === void 0) { x = 5; }
        if (y === void 0) { y = 5; }
        if (orientation === void 0) { orientation = CardinalDirections.North; }
        if (rotationDegree === void 0) { rotationDegree = 90; }
        if (moveStep === void 0) { moveStep = 1; }
        if (gridSize === void 0) { gridSize = { x: 10, y: 10 }; }
        if (instructions === void 0) { instructions = ''; }
        // 1er 
        this.gridSize = gridSize; //-> set gridSize(gridSize)
        this.x = x; //-> set x(x)
        this.y = y; //-> set y(y)
        this.orientation = orientation.toUpperCase(); //-> set orientation(orientation)
        this.rotationDegree = rotationDegree; //-> set rotatioDegree(rotatioDegree)
        this.moveStep = moveStep; //-> set moveStep(moveStep)
        this.instructions = instructions; //-> set instructions(instructions)
        this.runInstructions();
    }
    Aspirateur.prototype.drawGrid = function () {
        var width = this.gridSize.x;
        var height = this.gridSize.y;
        var grid = '  ';
        // x axis
        for (var x = 0; x < width; x++) {
            grid += "".concat(x, " ");
        }
        grid += '\n';
        for (var y = height - 1; y >= 0; y--) {
            var row = "".concat(y, " ");
            for (var x = 0; x < width; x++) {
                if (x === this.x && y === this.y) {
                    switch (this.orientation) {
                        case CardinalDirections.North:
                            row += '↑ ';
                            break;
                        case CardinalDirections.East:
                            row += '→ ';
                            break;
                        case CardinalDirections.West:
                            row += '← ';
                            break;
                        case CardinalDirections.South:
                            row += '↓ ';
                            break;
                    }
                }
                else {
                    row += '. ';
                }
            }
            grid += row + '\n';
        }
        console.log(grid);
    };
    Aspirateur.prototype.rotate = function () {
        if (!this.orientation) {
            console.log("Pas d'orientation - erreur - rotate()");
            return false;
        }
        return true;
    };
    // tourner à G 90°
    Aspirateur.prototype.rotateLeft = function () {
        if (this.rotate()) {
            switch (this.orientation) {
                case 'N': {
                    this.orientation = CardinalDirections.West;
                    break;
                }
                case 'W': {
                    this.orientation = CardinalDirections.South;
                    break;
                }
                case 'E': {
                    this.orientation = CardinalDirections.North;
                    break;
                }
                case 'S': {
                    this.orientation = CardinalDirections.East;
                    break;
                }
                default: {
                    console.log('rotateLeft() default');
                    break;
                }
            }
            console.log("Orientation changed to ".concat(this.orientation));
        }
    };
    // tourner à D 90°
    Aspirateur.prototype.rotateRight = function () {
        if (this.rotate()) {
            switch (this.orientation) {
                case 'N': {
                    this.orientation = CardinalDirections.East;
                    break;
                }
                case 'W': {
                    this.orientation = CardinalDirections.North;
                    break;
                }
                case 'E': {
                    this.orientation = CardinalDirections.South;
                    break;
                }
                case 'S': {
                    this.orientation = CardinalDirections.West;
                    break;
                }
                default: {
                    console.log('rotateRight() default');
                    break;
                }
            }
            console.log("Orientation changed to ".concat(this.orientation));
        }
    };
    // check si 
    // x entre [0 et max[  
    // y entre [0 et max[ 
    Aspirateur.prototype.isValidMove = function (x, y) { return x >= 0 && x < this.gridSize.x && y >= 0 && y < this.gridSize.y; };
    // avancer devvant lui
    Aspirateur.prototype.moveForward = function () {
        if (!this.orientation) {
            console.log("Pas d'orientation - erreur - moveForward()");
        }
        else {
            var newX = this.x;
            var newY = this.y;
            switch (this.orientation) {
                case CardinalDirections.North: {
                    newY += this.moveStep;
                    break;
                }
                case CardinalDirections.West: {
                    newX -= this.moveStep;
                    break;
                }
                case CardinalDirections.South: {
                    newY -= this.moveStep;
                    break;
                }
                case CardinalDirections.East: {
                    newX += this.moveStep;
                    break;
                }
                default: {
                    console.log('moveForward() default');
                    break;
                }
            }
            if (this.isValidMove(newX, newY)) {
                this.x = newX;
                this.y = newY;
                console.log("__________________\nNew Position:\n".concat(this.toString));
                this.drawGrid();
            }
            else {
                console.log("L'aspirateur ne peut pas sortir de la grille\nPosition actuelle (".concat(this.x, ", ").concat(this.y, ")\nPosition souhait\u00E9e (").concat(newX, ", ").concat(newY, ")\nTaille de la grille (").concat(this.gridSize.x, ", ").concat(this.gridSize.y, ")"));
            }
        }
    };
    // 
    Aspirateur.prototype.runInstructions = function () {
        var _this = this;
        if (!this.instructions) {
            console.log("Pas d'instructions - runInstructions()");
        }
        else {
            Array.from(this.instructions).forEach(function (instruction) {
                switch (instruction) {
                    case "D":
                        _this.rotateRight();
                        break;
                    case "G":
                        _this.rotateLeft();
                        break;
                    case "A":
                        _this.moveForward();
                        break;
                    default:
                        console.log('runInstructions() default');
                        break;
                }
            });
        }
    };
    Object.defineProperty(Aspirateur.prototype, "x", {
        // getters
        get: function () { return this._x; },
        // setters
        set: function (value) {
            if (value > this.gridSize.x) {
                console.log("valeur de x (".concat(value, ") sup\u00E9rieur \u00E0 la dimension x de la grille (").concat(this.gridSize.x, ")\nx sera initialis\u00E9 au maximum de la grille (").concat(this.gridSize.x, ")"));
                value = this.gridSize.x;
            }
            this._x = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Aspirateur.prototype, "y", {
        get: function () { return this._y; },
        set: function (value) {
            if (value > this.gridSize.y) {
                console.log("valeur de x (".concat(value, ") sup\u00E9rieur \u00E0 la dimension y de la grille (").concat(this.gridSize.y, ")\ny sera initialis\u00E9 au maximum de la grille (").concat(this.gridSize.y, ")"));
                value = this.gridSize.y;
            }
            this._y = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Aspirateur.prototype, "orientation", {
        get: function () { return this._orientation; },
        set: function (value) {
            if (!Object.values(CardinalDirections).includes(value)) {
                console.log("valeur de l'orientation incorrect (".concat(value, ") pas dans ['N','E','W','S']\nl'oriantation sera mise \u00E0 'N' par d\u00E9faut"));
                value = 'N';
            }
            this._orientation = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Aspirateur.prototype, "rotationDegree", {
        get: function () { return this._rotationDegree; },
        set: function (value) {
            this._rotationDegree = value % 360;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Aspirateur.prototype, "moveStep", {
        get: function () { return this._moveStep; },
        set: function (value) {
            if (value > this.gridSize.x || value > this.gridSize.y) {
                console.log("valeur du step (".concat(value, ") sup\u00E9rieur aux dimensionx de la grille (").concat(this.gridSize.x, " , ").concat(this.gridSize.y, ")\nstep sera mis \u00E0 1 par d\u00E9faut"));
                value = 1;
            }
            this._moveStep = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Aspirateur.prototype, "gridSize", {
        get: function () { return this._gridSize; },
        set: function (value) {
            if (value.x < 1) {
                console.log("valeur x (".concat(value.x, ") de la grille inf\u00E9rieur \u00E0 1\nelle sera donc initialis\u00E9 \u00E0 1"));
                value.x = 1;
            }
            if (value.y < 1) {
                console.log("valeur y (".concat(value.y, ") de la grille inf\u00E9rieur \u00E0 1\nelle sera donc initialis\u00E9 \u00E0 1"));
                value.y = 1;
            }
            this._gridSize = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Aspirateur.prototype, "instructions", {
        get: function () { return this._instructions; },
        set: function (value) {
            if (!value) {
                value = '';
            }
            this._instructions = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Aspirateur.prototype, "toString", {
        // toString
        get: function () {
            return "\n          Aspirateur: [\n              { x: ".concat(this.x, " },\n              { y: ").concat(this.y, " },\n              { orientation: ").concat(this.orientation, " },\n              { rotationDegree: ").concat(this.rotationDegree, " },\n              { moveStep: ").concat(this.moveStep, " },\n              { gridSize: ").concat(this.gridSize.x, " , ").concat(this.gridSize.y, " },\n              { instructions: ").concat(this.instructions, " },\n          ]\n      ");
        },
        enumerable: false,
        configurable: true
    });
    return Aspirateur;
}());
function main() {
    // template
    // new Aspirateur( x , y , orientation , rotationDegree , moveStep , gridSize )
    // console.log(aspirateur.toString) => voir la data
    // aspirateur.drawGrid() => voir dans la console
    // default one
    // const aspirateur0 = new Aspirateur()
    // console.log(aspirateur0.toString)
    // aspirateur0.drawGrid()
    // offset one
    // const aspirateur1 = new Aspirateur( 11, 11, 's' as CardinalDirections, 390, 11, { x:0, y:0 } )
    // console.log(aspirateur1.toString)
    // aspirateur1.drawGrid()
    // TEST 1
    var aspirateur2 = new Aspirateur(5, 5, 'n', 90, 1, { x: 10, y: 10 }, 'DADADADAA');
    // DA DA DA DAA
    // aspirateur2.rotateRight() // D
    // aspirateur2.moveForward() // A
    // aspirateur2.rotateRight() // D
    // aspirateur2.moveForward() // A
    // aspirateur2.rotateRight() // D
    // aspirateur2.moveForward() // A
    // aspirateur2.rotateRight() // D
    // aspirateur2.moveForward() // A
    // aspirateur2.moveForward() // A
}
main();
