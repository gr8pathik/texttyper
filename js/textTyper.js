/*!
 * jQuery Text Typer
 * 
 * @version : 1.0
 * @author : Pathik Gandhi (http://pathikgandhi.info)
 * @plugin_uri : https://github.com/gr8pathik/jquery-texttyper
 * @plugin_demo : http://labs.pathikgandhi.info/jquery/textTyper
 */
(function($){
	"use strict";
	$.fn.textTyper = function(options) {
		
		var defaults = {
			typingClass : 'typing', //Additional Class when the typing animation is running
			beforeAnimation : function(){}, //Callback before the animation starts
			afterAnimation : function(){}, //Callback after the animation ends
			speed : 70, //Speed of typing text
			nextLineDelay : 400, //Wait for some time after one line is typed.
			startsFrom : 0, //Start form the X characters
			repeatAnimation : true, //Repeat the animation
			repeatDelay : 4000, //Delay between Repeat animation
			repeatTimes : 0, //How much time you want to repeat the animation (0 means infinite)
			cursorHtml : '<span class="cursor">|</span>' //Html of cursor
		},
		settings = $.extend({}, defaults, options);
		  
		this.each(function() {
			//store this in $this variable
		  	var $this = $(this),
		  	repeatInt = 1,
		  	defaultCursorClass = "typingCursor";
		  	//  Get all children if any or get current one
	        var all = ($this.children().length > 0)?$this.children():$this,
	        i = all.length,
	        html = [];
	        //  Censorship, yo
		    while(i--) {
		        html[i] = $(all[i]).html();
		        $(all[i]).html('');
		    }

		    $this.init = function(i) {
		    	var beforeAnim = settings.beforeAnimation;
		    	if(beforeAnim) beforeAnim();
		    	$this.animate(0);
		    }
	        //  Go all Frankenstein and shit
		    $this.animate = function(i) {
		    	console.log($(settings.cursorHtml).html());
		        var me = all[i],		        
	            add = settings.typingClass,	            
	            //  C = character delay
	            //  D = line delay
	            c = settings.startsFrom;
		        //  Censor the page
		        $(me).addClass(add);
		        var inty = setInterval(function() {
		            //  MOAR TEXTS
		            var cursorTemp = settings.cursorHtml;
		            cursorTemp = $('<div>').append($(cursorTemp).addClass(defaultCursorClass)).html();
		            /*if(settings.cursorEffect == 'blink'){
		            	cursorTemp = $(cursorTemp).css('text-decoration','blink');
		            	//Create a Gohost div to get the current html
		            	cursorTemp = $('<div>').append($(cursorTemp).clone()).html();
		            }*/
		            $(me).html(html[i].substr(0, c) + cursorTemp);

		            //  What's the best programming language in the world?
		            //  Not this one.
		            c++;
		            
		            if(html[i].length < c) {
		                clearInterval(inty);
		                i++;
		                
		                if(all[i]) {
		                    setTimeout(function() {
		                        $(me).html(html[i - 1]);
		                        $this.animate(i);
		                    }, settings.nextLineDelay);
		                }else{
		                	$(me).find('.'+defaultCursorClass).hide();
		                	var afterAnim = settings.afterAnimation;
		    				if(afterAnim) afterAnim();
		    				if(settings.repeatAnimation && (settings.repeatTimes == 0 || repeatInt < settings.repeatTimes)){
		    					setTimeout(function(){
		    						$this.animate(0);
		    						repeatInt++;
		    					}, settings.repeatDelay);
		    				}           	
		                }
		            }
		        }, settings.speed);
		    };
		    $this.init();
		});
		  // returns the jQuery object to allow for chainability.
		return this;
	}
})(jQuery);