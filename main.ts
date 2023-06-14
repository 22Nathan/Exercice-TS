

// N = 0° || 360°
// E = 90°
// W = 180°
// S = 270°


enum CardinalDirections {
  North = 'N' ,
  East  = 'E' ,
  West  = 'W' ,
  South = 'S' ,
}

interface GridSize {
  x: number
  y: number
}

class Aspirateur {

  private _x ! :number
  private _y ! :number
  private _orientation ! :string
  private _rotationDegree ! :number
  private _moveStep ! :number
  private _gridSize ! :GridSize
  private _instructions ! :string

  constructor( 
    // Params
    x :number = 5, 
    y :number = 5, 
    orientation :CardinalDirections = CardinalDirections.North, 
    rotationDegree :number = 90,
    moveStep :number = 1,
    gridSize :GridSize = { x:10 , y:10 },
    instructions :string = '',
  ){
      // 1er 
      this.gridSize = gridSize                                            //-> set gridSize(gridSize)
      this.x = x                                                          //-> set x(x)
      this.y = y                                                          //-> set y(y)
      this.orientation = orientation.toUpperCase() as CardinalDirections  //-> set orientation(orientation)
      this.rotationDegree = rotationDegree                                //-> set rotatioDegree(rotatioDegree)
      this.moveStep = moveStep                                            //-> set moveStep(moveStep)
      this.instructions = instructions                                    //-> set instructions(instructions)
      this.runInstructions()
  }

  public drawGrid(): void {
    const width  = this.gridSize.x
    const height = this.gridSize.y
    let grid = '  '

    // x axis
    for (let x = 0 ; x < width ; x++) { grid += `${x} ` }

    grid += '\n'

    for (let y = height - 1 ; y >= 0 ; y--) {
      let row = `${y} `
      for (let x = 0 ; x < width ; x++) {
        if (x === this.x && y === this.y) { 
          switch (this.orientation) {
            case CardinalDirections.North: row += '↑ ' ; break
            case CardinalDirections.East:  row += '→ ' ; break
            case CardinalDirections.West:  row += '← ' ; break
            case CardinalDirections.South: row += '↓ ' ; break
          } 
        } 
        else { row += '. ' }
      }
      grid += row + '\n'
    }
    console.log(grid)
  }

  public rotate() :boolean {
    if( !this.orientation ){ 
      console.log( "Pas d'orientation - erreur - rotate()" ) 
      return false
    }
    return true
  }

  // tourner à G 90°
  public rotateLeft() :void {
    if( this.rotate() ){
      switch (this.orientation){
        case 'N': { this.orientation = CardinalDirections.West  ; break }
        case 'W': { this.orientation = CardinalDirections.South ; break }
        case 'E': { this.orientation = CardinalDirections.North ; break }
        case 'S': { this.orientation = CardinalDirections.East  ; break }
        default: { console.log('rotateLeft() default') ; break }
      }
      console.log(`Orientation changed to ${this.orientation}`)
    }
  }

  // tourner à D 90°
  public rotateRight() :void {
    if( this.rotate() ){ 
      switch (this.orientation){
        case 'N': { this.orientation = CardinalDirections.East  ; break }
        case 'W': { this.orientation = CardinalDirections.North ; break }
        case 'E': { this.orientation = CardinalDirections.South ; break }
        case 'S': { this.orientation = CardinalDirections.West  ; break }
        default: { console.log('rotateRight() default') ; break }
      }
      console.log(`Orientation changed to ${this.orientation}`)
    }
  }

  // check si 
    // x entre [0 et max[  
    // y entre [0 et max[ 
  private isValidMove(x :number, y :number) :boolean { return x >= 0 && x < this.gridSize.x && y >= 0 && y < this.gridSize.y }

  // avancer devvant lui
  public moveForward() :void {
    if( !this.orientation ){ console.log( "Pas d'orientation - erreur - moveForward()" ) } 
    else {
      let newX = this.x
      let newY = this.y

      switch( this.orientation ){
        case CardinalDirections.North: { newY += this.moveStep ; break }
        case CardinalDirections.West:  { newX -= this.moveStep ; break }
        case CardinalDirections.South: { newY -= this.moveStep ; break }
        case CardinalDirections.East:  { newX += this.moveStep ; break }
        default: { console.log('moveForward() default') ; break }
      }

      if( this.isValidMove(newX, newY) ){
        this.x = newX
        this.y = newY
        console.log(`__________________\nNew Position:\n${this.toString}`)
        this.drawGrid()
      } 
      else { console.log( `L'aspirateur ne peut pas sortir de la grille\nPosition actuelle (${this.x}, ${this.y})\nPosition souhaitée (${newX}, ${newY})\nTaille de la grille (${this.gridSize.x}, ${this.gridSize.y})` ) }
    }
  }

  // 
  public runInstructions(): void {
    if( !this.instructions ){ console.log(`Pas d'instructions - runInstructions()`) }
    else {
      Array.from(this.instructions).forEach((instruction) => {
        switch( instruction ) {
          case "D": this.rotateRight() ; break
          case "G": this.rotateLeft()  ; break
          case "A": this.moveForward() ; break
          default: console.log('runInstructions() default') ; break
        }
      })
    }
  }

  // getters
  public get x() :number { return this._x }
  public get y() :number { return this._y }
  public get orientation() :string { return this._orientation }
  public get rotationDegree() :number { return this._rotationDegree }
  public get moveStep() :number { return this._moveStep }
  public get gridSize() :GridSize { return this._gridSize }
  public get instructions() :string { return this._instructions }

  // setters
  public set x( value :number ){ 
      if( value > this.gridSize.x ) { 
        console.log(`valeur de x (${value}) supérieur à la dimension x de la grille (${this.gridSize.x})\nx sera initialisé au maximum de la grille (${this.gridSize.x})`) 
        value = this.gridSize.x
      }
      this._x = value
  }
  public set y( value :number ){ 
      if( value > this.gridSize.y ) { 
        console.log(`valeur de x (${value}) supérieur à la dimension y de la grille (${this.gridSize.y})\ny sera initialisé au maximum de la grille (${this.gridSize.y})`) 
        value = this.gridSize.y
      }
      this._y = value
  }
  public set orientation( value :CardinalDirections ){
      if( !Object.values(CardinalDirections).includes(value) ) { 
        console.log(`valeur de l'orientation incorrect (${value}) pas dans ['N','E','W','S']\nl'oriantation sera mise à 'N' par défaut`) 
        value = 'N' as CardinalDirections
      }
      this._orientation = value
  }
  public set rotationDegree( value :number ){ 
      this._rotationDegree = value % 360 
  }
  public set moveStep( value :number ){ 
      if( value > this.gridSize.x || value > this.gridSize.y ) { 
        console.log(`valeur du step (${value}) supérieur aux dimensionx de la grille (${this.gridSize.x} , ${this.gridSize.y})\nstep sera mis à 1 par défaut`) 
        value = 1
      }
      this._moveStep = value
  }
  public set gridSize( value :GridSize ){
      if( value.x < 1 ) { 
        console.log(`valeur x (${value.x}) de la grille inférieur à 1\nelle sera donc initialisé à 1`) 
        value.x = 1
      }
      if( value.y < 1 ) { 
        console.log(`valeur y (${value.y}) de la grille inférieur à 1\nelle sera donc initialisé à 1`) 
        value.y = 1
      }
      this._gridSize = value
  }
  public set instructions( value :string ){
    if( !value ) {
      value = ''
    }
    this._instructions = value
  }

  // toString
  public get toString() :string { 
      return `
          Aspirateur: [
              { x: ${this.x} },
              { y: ${this.y} },
              { orientation: ${this.orientation} },
              { rotationDegree: ${this.rotationDegree} },
              { moveStep: ${this.moveStep} },
              { gridSize: ${this.gridSize.x} , ${this.gridSize.y} },
              { instructions: ${this.instructions} },
          ]
      `
  }

}

function main(){

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
    const aspirateur2 = new Aspirateur( 5, 5, 'n' as CardinalDirections, 90, 1, { x:10, y:10 } , 'DADADADAA' )

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

main()