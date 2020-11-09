/*
Copyright © 2005 by Jaime R. Wilkesheski aka Durvivor

Permission to use, copy, modify and distribute this software and its documentation for any purpose and without fee is hereby granted, provided that the above copyright notice appear in all copies and that both the copyright notice and this permission notice appear in supporting documentation.  Jaime R. Wilkesheski aka Durvivor makes no representations about the suitability of this software for any purpose. It is provided "as is" without express or implied warranty.

JAIME R. WILKESHESKI AKA DURVIVOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE, INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL JAIME R. WILKESHESKI AKA DURVIVOR BE LIABLE FOR ANY SPECIAL, INDIRECT OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/
  

/*********************************/
// HIDING AND SHOWING PREFERENCES
/*********************************/


// PREFERENCE BUTTON ANIMATION (- the pref flipper fade in/out)

var flipShown = false;		// a flag used to signify if the flipper is currently shown or not.


// A structure that holds information that is needed for the animation to run.
var animation = {duration:0, starttime:0, to:1.0, now:0.0, from:0.0, firstElement:null, timer:null};


// mousemove() is the event handle assigned to the onmousemove property on the front div of the widget. 
// It is triggered whenever a mouse is moved within the bounds of your widget.  It prepares the
// preference flipper fade and then calls animate() to performs the animation.

function mousemove (event) {
	if (!flipShown)			// if the preferences flipper is not already showing...
	{
		if (animation.timer != null)			// reset the animation timer value, in case a value was left behind
		{
			clearInterval (animation.timer);
			animation.timer  = null;
		}
		
		var starttime = (new Date).getTime() - 13; 		// set it back one frame
		
		animation.duration = 500;												// animation time, in ms
		animation.starttime = starttime;										// specify the start time
		animation.firstElement = document.getElementById ('flip');		// specify the element to fade
		animation.timer = setInterval ("animate();", 13);						// set the animation function
		animation.from = animation.now;											// beginning opacity (not ness. 0)
		animation.to = 1.0;														// final opacity
		animate();																// begin animation
		flipShown = true;														// mark the flipper as animated
	}
}

// mouseexit() is the opposite of mousemove() in that it preps the preferences flipper
// to disappear.  It adds the appropriate values to the animation data structure and sets the animation in motion.

function mouseexit (event) {
	if (flipShown)
	{
		// fade in the flip widget
		if (animation.timer != null)
		{
			clearInterval (animation.timer);
			animation.timer  = null;
		}
		
		var starttime = (new Date).getTime() - 13;
		
		animation.duration = 500;
		animation.starttime = starttime;
		animation.firstElement = document.getElementById ('flip');
		animation.timer = setInterval ("animate();", 13);
		animation.from = animation.now;
		animation.to = 0.0;
		animate();
		flipShown = false;
	}
}


// animate() performs the fade animation for the preferences flipper. It uses the opacity CSS property to simulate a fade.

function animate() {
	var T;
	var ease;
	var time = (new Date).getTime();
		
	
	T = limit_3(time-animation.starttime, 0, animation.duration);
	
	if (T >= animation.duration)
	{
		clearInterval (animation.timer);
		animation.timer = null;
		animation.now = animation.to;
	}
	else
	{
		ease = 0.5 - (0.5 * Math.cos(Math.PI * T / animation.duration));
		animation.now = computeNextFloat (animation.from, animation.to, ease);
	}
	
	animation.firstElement.style.opacity = animation.now;
}


// these functions are utilities used by animate()

function limit_3 (a, b, c) {
    return a < b ? b : (a > c ? c : a);
}

function computeNextFloat (from, to, ease) {
    return from + (to - from) * ease;
}

// these functions are called when the info button itself receives onmouseover and onmouseout events

function enterflip(event) {
   mousemove();
   document.getElementById('fliprollie').style.display = 'block';
}

function exitflip(event) {
	document.getElementById('fliprollie').style.display = 'none';
}



// END PREFS DISPLAY




// Prefs

function showPrefs() {
     var front = document.getElementById("face"); 
     var back = document.getElementById("prefs");
	
     if (window.widget)
        widget.prepareForTransition("ToBack");		

     front.style.display="none";		// hide the front
   document.getElementById('face').style.display='none';
   document.getElementById('ask').style.display='none';
   document.getElementById('fuzz').style.display='none';
   document.getElementById('pockets').style.display='none';
   document.getElementById('gun').style.display='none';
   document.getElementById('district').style.display='none';
   document.getElementById('message').style.display='none';
     back.style.display="block";		// show the back	

     if (window.widget)
        setTimeout ('widget.performTransition();', 0);		

     document.getElementById('fliprollie').style.display = 'none'; 

}

function hidePrefs() {

     var front = document.getElementById("face");
     var back = document.getElementById("prefs");
	
     if (window.widget)
          widget.prepareForTransition("ToFront");		
	
     front.style.display="block";		
     back.style.display="none";		// show the back

     
     if (window.widget)
          setTimeout ('widget.performTransition();', 0);		

     document.getElementById('fliprollie').style.display = 'none'; 

}








	
