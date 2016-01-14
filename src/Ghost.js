//////////////////////////////////////////////////////
// Group members: Zi Wang (ziw), Bingying Xia(bxia) //
//////////////////////////////////////////////////////

function Ghost(xCord, yCord, gColor, direction){
	this.x = xCord;
	this.y = yCord;
	this.color = gColor;
	this.dir = direction;
	this.isWeak = false;
	this.radius = GHOST_RADIUS;
	this.isMoving = false;
	this.isBlinking = false;
	this.isDead = false;
	this.speed = speed;
	this.stepCounter = 0;

}

//send this ghost back to ghost house.
//location in ghost house is determined by its color
Ghost.prototype.toGhostHouse = function() {
	var initX, initY;
	switch(this.color){
			case ORANGE:
			initX = ghostHouse[0][1]*GRID_WIDTH + GRID_WIDTH/2;
			initY = ghostHouse[0][0]*GRID_WIDTH + GRID_WIDTH/2;
			break;

			case CYAN:
			initX =  ghostHouse[1][1]*GRID_WIDTH + GRID_WIDTH/2;
			initY =  ghostHouse[1][0]*GRID_WIDTH + GRID_WIDTH/2;
			break;

			case PINK:
			initX = ghostHouse[2][1]*GRID_WIDTH + GRID_WIDTH/2;
			initY = ghostHouse[2][0]*GRID_WIDTH + GRID_WIDTH/2;
  			break;

			case RED:
			initX = ghostHouse[3][1]*GRID_WIDTH + GRID_WIDTH/2;
			initY = ghostHouse[3][0]*GRID_WIDTH + GRID_WIDTH/2;
			break;


		}
	this.x = initX;
	this.y = initY;
	this.dir = DOWN;
	this.stepCounter = 0;
};

Ghost.prototype.draw = function() {

	if(!this.isDead){
		// body color
		if(this.isWeak){
			if(this.isBlinking){
				ctx.fillStyle = BLINKING_COLOR;
			}
			else{
				ctx.fillStyle = WEAK_COLOR;
			}
		}
		else{
			ctx.fillStyle = this.color;
		}
		
		ctx.beginPath();

		ctx.arc(this.x, this.y, this.radius, Math.PI, 0, false);
		ctx.moveTo(this.x-this.radius, this.y);
		

		// LEGS
		if (!this.isMoving){
			ctx.lineTo(this.x-this.radius, this.y+this.radius);
			ctx.lineTo(this.x-this.radius+this.radius/3, this.y+this.radius-this.radius/4);
			ctx.lineTo(this.x-this.radius+this.radius/3*2, this.y+this.radius);
			ctx.lineTo(this.x, this.y+this.radius-this.radius/4);
			ctx.lineTo(this.x+this.radius/3, this.y+this.radius);
			ctx.lineTo(this.x+this.radius/3*2, this.y+this.radius-this.radius/4);

			ctx.lineTo(this.x+this.radius, this.y+this.radius);
			ctx.lineTo(this.x+this.radius, this.y);
		}
		else {
			ctx.lineTo(this.x-this.radius, this.y+this.radius-this.radius/4);
			ctx.lineTo(this.x-this.radius+this.radius/3, this.y+this.radius);
			ctx.lineTo(this.x-this.radius+this.radius/3*2, this.y+this.radius-this.radius/4);
			ctx.lineTo(this.x, this.y+this.radius);
			ctx.lineTo(this.x+this.radius/3, this.y+this.radius-this.radius/4);
			ctx.lineTo(this.x+this.radius/3*2, this.y+this.radius);
			ctx.lineTo(this.x+this.radius, this.y+this.radius-this.radius/4);
			ctx.lineTo(this.x+this.radius, this.y);
		}
		

		ctx.fill();
	}


	if(this.isWeak){

		if(this.isBlinking){
			ctx.fillStyle = "#f00";
			ctx.strokeStyle = "f00";
		}
		else{
			ctx.fillStyle = "white";
			ctx.strokeStyle = "white";
		}

		//eyes
		ctx.beginPath();//left eye
		ctx.arc(this.x-this.radius/2.5, this.y-this.radius/5, this.radius/5, 0, Math.PI*2, true); // white
		ctx.fill();

		ctx.beginPath(); // right eye
		ctx.arc(this.x+this.radius/2.5, this.y-this.radius/5, this.radius/5, 0, Math.PI*2, true); // white
		ctx.fill();

		//mouth
		ctx.beginPath();
		ctx.lineWidth=1;
		ctx.moveTo(this.x-this.radius+this.radius/5, this.y+this.radius/2);
		ctx.lineTo(this.x-this.radius+this.radius/3, this.y+this.radius/4);
		ctx.lineTo(this.x-this.radius+this.radius/3*2, this.y+this.radius/2);
		ctx.lineTo(this.x, this.y+this.radius/4);
		ctx.lineTo(this.x+this.radius/3, this.y+this.radius/2);
		ctx.lineTo(this.x+this.radius/3*2, this.y+this.radius/4);
		ctx.lineTo(this.x+this.radius-this.radius/5, this.y+this.radius/2);
		ctx.stroke();
	}
	else{
		// EYES
		ctx.fillStyle = "white"; //left eye
		ctx.beginPath();
		ctx.arc(this.x-this.radius/2.5, this.y-this.radius/5, this.radius/3, 0, Math.PI*2, true); // white
		ctx.fill();

		ctx.fillStyle = "white"; //right eye
		ctx.beginPath();
		ctx.arc(this.x+this.radius/2.5, this.y-this.radius/5, this.radius/3, 0, Math.PI*2, true); // white
		ctx.fill();


		switch(this.dir){

			case UP:
				ctx.fillStyle="black"; //left eyeball
				ctx.beginPath();
				ctx.arc(this.x-this.radius/3, this.y-this.radius/5-this.radius/6, this.radius/6, 0, Math.PI*2, true); //black
				ctx.fill();

				ctx.fillStyle="black"; //right eyeball
				ctx.beginPath();
				ctx.arc(this.x+this.radius/3, this.y-this.radius/5-this.radius/6, this.radius/6, 0, Math.PI*2, true); //black
				ctx.fill();
			break;

			case DOWN:
				ctx.fillStyle="black"; //left eyeball
				ctx.beginPath();
				ctx.arc(this.x-this.radius/3, this.y-this.radius/5+this.radius/6, this.radius/6, 0, Math.PI*2, true); //black
				ctx.fill();

				ctx.fillStyle="black"; //right eyeball
				ctx.beginPath();
				ctx.arc(this.x+this.radius/3, this.y-this.radius/5+this.radius/6, this.radius/6, 0, Math.PI*2, true); //black
				ctx.fill();
			break;

			case LEFT:
				ctx.fillStyle="black"; //left eyeball
				ctx.beginPath();
				ctx.arc(this.x-this.radius/3-this.radius/5, this.y-this.radius/5, this.radius/6, 0, Math.PI*2, true); //black
				ctx.fill();

				ctx.fillStyle="black"; //right eyeball
				ctx.beginPath();
				ctx.arc(this.x+this.radius/3-this.radius/15, this.y-this.radius/5, this.radius/6, 0, Math.PI*2, true); //black
				ctx.fill();
			break;

			case RIGHT:
				ctx.fillStyle="black"; //left eyeball
				ctx.beginPath();
				ctx.arc(this.x-this.radius/3+this.radius/15, this.y-this.radius/5, this.radius/6, 0, Math.PI*2, true); //black
				ctx.fill();

				ctx.fillStyle="black"; //right eyeball
				ctx.beginPath();
				ctx.arc(this.x+this.radius/3+this.radius/5, this.y-this.radius/5, this.radius/6, 0, Math.PI*2, true); //black
				ctx.fill();
			break;

		}

	}


	
};

Ghost.prototype.getRow = function() {
	return getRowIndex(this.y);
};

Ghost.prototype.getCol = function() {
	return getColIndex(this.x);
};

//move one step in the current direction if allowed
Ghost.prototype.moveOneStep = function() {
	// body...
	var newX =0;
	var newY =0;
	if(!canMoveX(this.x, this.y, this.dir)){
		return;
	}
	switch(this.dir){

		case UP:
		newY = this.y  - this.speed;
		if(newY - this.radius - WALL_WIDTH > 0){
			this.y = newY;
		}
		break;

		case DOWN:
		newY = this.y + this.speed;
		if(newY + this.radius + WALL_WIDTH < CANVAS_HEIGHT) {
			this.y = newY;

		}
		break;


		case LEFT:
		newX = this.x - this.speed;
		if(newX - this.radius - WALL_WIDTH > 0 ){
			this.x = newX;
		}
		break;

		case RIGHT:
		newX = this.x + this.speed;

		if(newX + this.radius + WALL_WIDTH < CANVAS_WIDTH){
			this.x = newX;
		}
		break;
		
		default:
		break;
	}
};

//make an 180-degree turn
Ghost.prototype.turnBack = function() {
	this.dir = oppositeDir(this.dir);
};

//try to turn(if necessary) and move the ghost
Ghost.prototype.move = function() {
	this.isMoving = !this.isMoving;//so the ghost looks like it's moving
	if(this.isWeak){
		this.speed = speed/2;
		this.stepCounter++;
	} else if(this.stepCounter != 0 && this.stepCounter % 2 !=0){
		this.speed = speed/2;
		this.stepCounter = 0;
	} else {
		this.speed = speed;
	}

	if(onGridCenter(this.x, this.y) === false){
		this.moveOneStep();
	} else{
		// on grid center
		var positions = {
			"pacman": {dir: mrPacman.dir, x: mrPacman.getCol(), y: mrPacman.getRow()},
			"red": {dir: blinky.dir, x: blinky.getCol(), y: blinky.getRow(), isDead: blinky.isDead, isWeak: blinky.isWeak, isBlinking: blinky.isBlinking},
			"cyan": {dir: inky.dir, x: inky.getCol(), y: inky.getRow(), isDead: inky.isDead, isWeak: inky.isWeak, isBlinking: inky.isBlinking},
			"orange": {dir: clyde.dir, x: clyde.getCol(), y: clyde.getRow(), isDead: clyde.isDead, isWeak: clyde.isWeak, isBlinking: clyde.isBlinking},
			"pink": {dir: pinky.dir, x: pinky.getCol(), y: pinky.getRow(), isDead: pinky.isDead, isWeak: pinky.isWeak, isBlinking: pinky.isBlinking}
		}

		switch(this.color){
			case RED:
			//blinky
			var new_dir = redMove(positions);
			break;

			case CYAN:
			var new_dir = cyanMove(positions);
			break;

			case ORANGE:
			var new_dir = orangeMove(positions)
			break;

			case PINK:
			var new_dir = pinkMove(positions)
			break;
		}
		if ([UP, DOWN, LEFT, RIGHT].indexOf(new_dir) > -1) {
			this.dir = new_dir
		}
		this.moveOneStep();
	}
};

//make random move at intersection
Ghost.prototype.randomMove = function() {
	var nextDir =  parseInt(Math.random()*4)+1;
	while(true){
		if( nextDir != oppositeDir(this.dir) 
			&& canMoveX(this.x, this.y, nextDir)){
			break;
		}
		nextDir =  parseInt(Math.random()*4)+1;
	}

	this.dir = nextDir;
	this.moveOneStep();
};
