
let resolution = 10;
let coluns = resolution * 10;
let rows = resolution * 10;
//let colors = [];
let grid;
 	

function maker2DGrid(rows, coluns){
	let arr = new Array(rows);	
	for (var i = 0; i < arr.length; i++) {
		arr[i] = new Array(coluns);
	}
	return arr;
} 	


function setup() {
  	createCanvas((resolution*70)+1, (resolution*50)+1);
	grid = maker2DGrid(rows, coluns);
	for(let i=0; i<coluns; i++){
		for(let j=0; j<rows; j++){
			grid[i][j] = floor(random(2));
		}
	}
}

function draw() {
  	background(0);

  	for(let i=0; i<coluns; i++){
		for(let j=0; j<rows; j++){
			let x = i * resolution;
			let y = j * resolution;

			if(grid[i][j] == 1){
				fill(255);
				rect(x, y, resolution, resolution);
			}
		}
	} 


  	let next = maker2DGrid(rows, coluns);

  	//Verify neighbots
  	for(let i=0; i<coluns; i++){
		for(let j=0; j<rows; j++){
			//Count live neighbors! 
			let state = grid[i][j];
			let neighbors = countNeighbours(grid,i,j);
			if(state == 0 && neighbors == 3){
				next[i][j] = 1;
			}else if(state == 1 && (neighbors < 2 || neighbors > 3)){
				next[i][j] = 0;
			}else{
				next[i][j] = state; 	 
			}
		}
	}
  	grid = next;
}

function countNeighbours(grid, x, y){
	let sum = 0;
	for (var i = -1; i < 2; i++) {
		for (var j = -1; j < 2; j++) {
			let col = (x+i+coluns) % coluns;
			let row = (y+j+rows) % rows;

			sum += grid[col][row];
		}
	}
	sum -= grid[x][y];
	return sum;
}
