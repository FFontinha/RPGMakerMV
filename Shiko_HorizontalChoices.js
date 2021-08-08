/*:
* @plugindesc Changes the choices commands so they are presented in horizontal order.
* @author Shiko
*
*
* @help
* V1.1 - Choose the swith to turn the plugin ON
*
* @param Trigger Switch
* @desc Switch number to trigger the horizontal order
* @default 1
*
*/

(function()  {
	var parameters = PluginManager.parameters('Shiko_HorizontalChoices');
	var trigger_switch = Number(parameters["Trigger Switch"]) || 1;

		Window_ChoiceList.prototype.updatePlacement = function() {
			if ($gameSwitches.value(trigger_switch) == true) {
			    var positionType = $gameMessage.choicePositionType();
			    var messageY = this._messageWindow.y;
			    this.width = this.windowWidth();
			    this.height = this.windowHeight();
			    switch (positionType) {
			    case 0:
			        this.x = 0;
			        break;
			    case 1:
			        this.x = (Graphics.boxWidth - this.width) / 2;
			        break;
			    case 2:
			        this.x = Graphics.boxWidth - this.width;
			        break;
			    }
			    if (messageY >= Graphics.boxHeight / 2) {
			        this.y = messageY - this.height;
			    } else {
			        this.y = messageY + this._messageWindow.height;
			    }
			}
			else {
				var positionType = $gameMessage.choicePositionType();
			    var messageY = this._messageWindow.y;
			    this.width = this.windowWidth();
			    this.height = this.windowHeight();
			    switch (positionType) {
			    case 0:
			        this.x = 0;
			        break;
			    case 1:
			        this.x = (Graphics.boxWidth - this.width) / 2;
			        break;
			    case 2:
			        this.x = Graphics.boxWidth - this.width;
			        break;
			    }
			    if (messageY >= Graphics.boxHeight / 2) {
			        this.y = messageY - this.height;
			    } else {
			        this.y = messageY + this._messageWindow.height;
			    }
			}
		};

		Window_ChoiceList.prototype.windowWidth = function() {
			if ($gameSwitches.value(trigger_switch) == true) {
			    var choices = $gameMessage.choices();
			    var numLines = choices.length;
			    var width = (this.maxChoiceWidth() + this.padding * 2)*choices.length;
			    return Math.min(width, Graphics.boxWidth*2);
			}
			else {
				var width = this.maxChoiceWidth() + this.padding * 2;
    			return Math.min(width, Graphics.boxWidth);
			}
		};



		Window_ChoiceList.prototype.numVisibleRows = function() {
			if ($gameSwitches.value(trigger_switch) == true) {
			    return 1;
			}
		    else {
		    	var messageY = this._messageWindow.y;
			    var messageHeight = this._messageWindow.height;
			    var centerY = Graphics.boxHeight / 2;
			    var choices = $gameMessage.choices();
			    var numLines = choices.length;
			    var maxLines = 8;
			    if (messageY < centerY && messageY + messageHeight > centerY) {
			        maxLines = 4;
			    }
			    if (numLines > maxLines) {
			        numLines = maxLines;
			    }
			    return numLines;
		    }
		};

		Window_ChoiceList.prototype.maxCols = function() {
			if ($gameSwitches.value(trigger_switch) == true) {
			    var choices = $gameMessage.choices();
			    numCols = choices.length;
			    switch (numCols) {
			    case 1:
			        return 1;
			    case 2:
			        return 2;
			    case 3:
			        return 3;
			    case 4:
			        return 4;
			    case 5:
			        return 5;
			    case 6:
			        return 6;
			    }
			}
			else {
				return 1;
			}
		};


		Window_ChoiceList.prototype.drawItem = function(index) {
			if ($gameSwitches.value(trigger_switch) == true) {
			    var rect = this.itemRectForText(index);
			    var text = this.commandName(index);
			    this.drawTextEx(text, rect.x, rect.y);
			}
			else {
				var rect = this.itemRectForText(index);
    			this.drawTextEx(this.commandName(index), rect.x, rect.y);
			}
		};

	
})();
