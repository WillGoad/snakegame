import { useState, useEffect } from "react";

type TilePixels = {
  snake: number[][];
  tiles: string[][];
}

export function Snake() {
  console.log("Rerender");
    let cols: number = 8;
    let rows: number = 8;
    const [apple, setApple] = useState(getRandomCoords(cols,rows));
    const [tilePixels, setTilePixels] = useState<TilePixels>({snake: [[0,0],[1,0],[2,0],[3,0]], tiles: initialiseTiles()});
    const [direction, setDirection] = useState("RIGHT");
    const [speed, setSpeed] = useState(1000);



    useEffect(() => {
        document.addEventListener("keydown", (event) => onKeyDown(event));
      }, []);

      useEffect(() => {
        // function moveSnake() {
        //   console.log ("It has been ms:", speed);
        //     let dots = [...tilePixels.snake];
        //     console.log(tilePixels.snake);
        //     let head = dots[dots.length -1];
        //     switch (direction) {
        //         case 'RIGHT':
        //             head = [head[0] + 1, head[1]];
        //             break;
        //         case 'LEFT':
        //             head = [head[0] - 1, head[1]];
        //             break;
        //         case 'UP':
        //             head = [head[0], head[1] - 1];
        //             break;
        //         case 'DOWN':
        //             head = [head[0], head[1] + 1];
        //             break;
        //     }
        //     dots.push(head);
        //     dots.shift();
        //     setTilePixels(prevState => {
        //       return           {
        //         ...prevState,
        //         snake: dots
        //       }
        //     });
        //     console.log(tilePixels.snake);
                 
        // }
        updateTiles();   
        setInterval(updateTiles, speed);
      }, []);

      function updateTiles () {
        let tempArray = [...tilePixels.tiles];
        for(var x = 0; x < cols; x++) {
            for(var y = 0; y < rows; y++) {
                for(var z = 0; z < tilePixels.snake.length; z++) {
                    if(tilePixels.snake[z][0] === x && tilePixels.snake[z][1] === y) {
                        tempArray[x][y] = 'snake';
                    } else if(apple[0] === x && apple[1] === y){
                        tempArray[x][y] = 'apple';
                    } else {
                        tempArray[x][y] = 'empty';
                    }
                }
            }
        }
        setTilePixels(prevState => {
          return {
            ...prevState,
            tiles: tempArray
          }
        });
      }


    const onKeyDown = (e: KeyboardEvent) => {
        e = e || window.event;
        switch (e.keyCode) {
            case 38:
                setDirection("UP");
                break;
            case 87:
                setDirection("UP");
                break;
            case 40:
                setDirection("DOWN");
                break;
            case 83:
                setDirection("DOWN");
                break;
            case 37:
                setDirection("LEFT");
                break;
            case 65:
                setDirection("LEFT");
                break;
            case 39:
                setDirection("RIGHT");
                break;
            case 68:
                setDirection("RIGHT");
                break;                
        }
    }

    function initialiseTiles () {
        let newArray: string[][] = []
        for(var f = 0; f < cols; f++) {
            newArray[f] = [];
            for(var t = 0; t < rows; t++) {
                newArray[f].push('empty');
            }
        }
        return newArray;
    }



    function getRandomCoords(colNo: number, rowNo: number) {
        let x = Math.floor(Math.random()*colNo);
        let y = Math.floor(Math.random()*rowNo);
        return [x,y];
    }

    







  return (
    <div className="stage">
        <div style={{display: "flex", flexDirection: "row", width: "100%", height: "100%", flexWrap: "wrap"}}>
        {
            tilePixels.tiles.map((tile, index) => 
                    <div style={{display: "flex", flexDirection: "column", flexBasis: "100%", flex: "1"}}>
                    {tile.map((subtile, index) =>
                        (subtile === 'empty')?<div className="tile" style={{height: "100%", opacity: "0.2"}}></div>: (subtile=== 'snake')?<div className="tile" style={{height: "100%", background: "white"}}></div>: <div className="tile" style={{height: "100%", background: "yellow"}}></div>
                    )}
                    </div>
            )
        }
      </div>
    </div>
  );
}

//Backup bad code
// import { useState, useEffect, useRef } from "react";

// export function Snake() {
//   let cols = useRef(8);
//   let rows = useRef(8);
//   let apple = useRef(getRandomCoords(cols.current,rows.current));
//   let [snakePixels, setSnakePixels] = useState([
//     [0, 0],
//     [1, 0],
//     [2, 0],
//     [3, 0],
//   ]);
//   let direction = useRef("RIGHT");
//   let speed = useRef(100);
//   let tiles = useRef(initialiseTiles());

//   useEffect(() => {
//     const onKeyDown = (e: KeyboardEvent) => {
//       e = e || window.event;
//       switch (e.keyCode) {
//         case 38:
//           direction.current = "UP";
//           break;
//         case 87:
//           direction.current = "UP";
//           break;
//         case 40:
//           direction.current = "DOWN";
//           break;
//         case 83:
//           direction.current = "DOWN";
//           break;
//         case 37:
//           direction.current = "LEFT";
//           break;
//         case 65:
//           direction.current = "LEFT";
//           break;
//         case 39:
//           direction.current = "RIGHT";
//           break;
//         case 68:
//           direction.current = "RIGHT";
//           break;
//       }
//     };
//     document.addEventListener("keydown", (event) => onKeyDown(event));
//   }, []);

//   // useEffect(() => {
    
    
//   //   const handle = setInterval(updateTiles, speed.current);
//   //   return () => {
//   //     clearInterval(handle);
//   //   };
//   // }, [updateTiles]);

  

//   function initialiseTiles() {
//     let newArray: string[][] = [];
//     console.log("Init");
//     for (var f = 0; f < cols.current; f++) {
//       newArray[f] = [];
//       for (var t = 0; t < rows.current; t++) {
//         newArray[f].push("empty");
//       }
//     }
//     return newArray;
//   }

//   function updateTiles() {
//     if (tiles.current !== undefined) {
//       for (var x = 0; x < cols.current; x++) {
//         for (var y = 0; y < rows.current; y++) {
//           for (var z = 0; z < snakePixels.length; z++) {
//               console.log(snakePixels[z],[x,y]);
//             if(snakePixels[z] === [x,y]) {
//                 console.log("true");
//                 tiles.current[x][y] = "snake";
//             } else if (apple.current[0] === x && apple.current[1] === y) {
//             tiles.current[x][y] = "apple";
//             } else {
//               tiles.current[x][y] = "empty";
//             }
//           }
//         }
//       }
//     }
//     //Checking if tiles is undef ^
//   }

// function moveSnake() {
//   let head = snakePixels[snakePixels.length - 1];
//   switch (direction.current) {
//     case "RIGHT":
//       head = [head[0] + 1, head[1]];
//       break;
//     case "LEFT":
//       head = [head[0] - 1, head[1]];
//       break;
//     case "UP":
//       head = [head[0], head[1] - 1];
//       break;
//     case "DOWN":
//       head = [head[0], head[1] + 1];
//       break;
//     default:
//         head = [head[0], head[1]];
//         break;
//   }
//   let dots = [...snakePixels];
//   dots.push(head);
//   dots.shift();
//   setSnakePixels(dots);
  
// }

//   function getRandomCoords(colNo: number, rowNo: number) {
//     let x = Math.floor(Math.random() * colNo);
//     let y = Math.floor(Math.random() * rowNo);
//     return [x, y];
//   }

//   return (
//     <div className="stage">
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           width: "100%",
//           height: "100%",
//           flexWrap: "wrap",
//         }}
//       >
//         {tiles.current.map((tile, index) => (
//           <div key={index}
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               flexBasis: "100%",
//               flex: "1",
//             }}
//           >
//             {tile.map((subtile, index) =>
//               subtile === "empty" ? (
//                 <div
//                 key={index}
//                   className="tile"
//                   style={{ height: "100%", opacity: "0.2" }}
//                 ></div>
//               ) : subtile === "snake" ? (
//                 <div
//                     key={index}
//                   className="tile"
//                   style={{ height: "100%", background: "white" }}
//                 ></div>
//               ) : (
//                 <div
//                     key={index}
//                   className="tile"
//                   style={{ height: "100%", background: "yellow" }}
//                 ></div>
//               )
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
