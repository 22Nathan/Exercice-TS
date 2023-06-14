


# Nathan ROSSI

# Yanport 
Test Technique - Développeur Full Stack

iHoover


```
Dossier

./
  | main.ts -> fichier de référence
  | main.js -> fichier complilé
  | documentation.md -> documentation technique
```

## Enumération : CardinalDirections

```typescript
// Une énumération représentant les directions cardinales
enum CardinalDirections {
  North = 'N' ,
  East  = 'E' ,
  West  = 'W' ,
  South = 'S' ,
}
```

## Interface : GridSize

```typescript
// Une interface représentant la taille de la grille
interface GridSize {
  x: number
  y: number
}
```

La classe `Aspirateur` représente un aspirateur. Elle possède les propriétés et méthodes suivantes :

## Constructeur

```typescript
// Crée une instance de la classe Aspirateur.
// il y a des valeurs par défaut
constructor(
  x: number = 5,
  y: number = 5,
  orientation: CardinalDirections = CardinalDirections.North,
  rotationDegree: number = 90,
  moveStep: number = 1,
  gridSize: GridSize = { x: 10, y: 10 },
  instructions: string = ''
)
```

```typescript
// Affiche la grille dans la console.
public drawGrid(): void
```

```typescript
// Fait tourner l'aspirateur de 90 degrés vers la gauche.
public rotateLeft(): void
```

```typescript
// Fait tourner l'aspirateur de 90 degrés vers la droite.
public rotateRight(): void
```

```typescript
// Déplace l'aspirateur vers l'avant en fonction de son orientation et de la valeur de moveStep.
public moveForward(): void
```

```typescript
// Exécute les instructions fournies pour guider l'aspirateur. ( droite , gauche , avancer )
public runInstructions(): void
```

```typescript
// Méthode : toString() retourne le descriptif de l'instance sous forme d'une chaîne de caractère
public get toString(): string
```

Propriétés (getters et setters)

- x : La coordonnée x de l'aspirateur (nombre)
- y : La coordonnée y de l'aspirateur (nombre)
- orientation : L'orientation de l'aspirateur (direction cardinale)
- rotationDegree : Le degré de rotation de l'aspirateur (nombre)
- moveStep : La taille du pas pour chaque déplacement de l'aspirateur (nombre)
- gridSize : La taille de la grille (objet GridSize)
- instructions : Les instructions pour guider l'aspirateur (chaîne de caractères)

```typescript
// getters
public get x() :number { return this._x }
public get y() :number { return this._y }
public get orientation() :string { return this._orientation }
public get rotationDegree() :number { return this._rotationDegree }
public get moveStep() :number { return this._moveStep }
public get gridSize() :GridSize { return this._gridSize }
public get instructions() :string { return this._instructions }

// setters
public set x( value :number ){ ... }
public set y( value :number ){ ... }
public set orientation( value :CardinalDirections ){ ... }
public set rotationDegree( value :number ){ ... }
public set moveStep( value :number ){ ... }
public set gridSize( value :GridSize ){ ... }
public set instructions( value :string ){ ... }
```

# Tester le programme

Pour tester le programme, commentez et/ou ajouter une nouvelle instance de la classe Aspirateur

Comme cet example :

```typescript
// new Aspirateur( x , y , orientation , rotationDegree , moveStep , gridSize , instructions )
// /!\ rotationDegree n'est pas utilisé 
// console.log(aspirateur.toString) => voir la data
// aspirateur.drawGrid() => voir dans la console

// TEST 1
const aspirateur2 = new Aspirateur( 5, 5, 'n' as CardinalDirections, 90, 1, { x:10, y:10 } , 'DADADADAA' )
```

Pour voir le résultat :

```node
<!-- nodejs doit être installé -->

npm install -g typescript
tsc main.ts | node main.js
```

```
Résultat
__________________
New Position:

          Aspirateur: [
              { x: 5 },
              { y: 6 },
              { orientation: N },
              { rotationDegree: 90 },
              { moveStep: 1 },
              { gridSize: 10 , 10 },
              { instructions: DADADADAA },
          ]

  0 1 2 3 4 5 6 7 8 9
9 . . . . . . . . . .
8 . . . . . . . . . .
7 . . . . . . . . . .
6 . . . . . ↑ . . . .
5 . . . . . . . . . .
4 . . . . . . . . . .
3 . . . . . . . . . .
2 . . . . . . . . . .
1 . . . . . . . . . .
0 . . . . . . . . . .
```