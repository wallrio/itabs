/**
 * iTabs v1.1 - 27/04/2016
 * divide of content by tab
 *
 * developed by Wallace Rio <wallrio@gmail.com>
 * wallrio.com
 * 
 * tested on firefox/chrome/opera/ie8/safari
 * 
 */


(function(){

	var TabNow = null;
	var slideNow = null;
	var countITabs = 0;

/**
 * fix compatible getElementsByClassName to ie8 
 */
if (!document.getElementsByClassName) {
    var indexOf = [].indexOf || function(prop) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === prop) return i;
        }
        return -1;
    };
    getElementsByClassName = function(className, context) {
        var elems = document.querySelectorAll ? context.querySelectorAll("." + className) : (function() {
            var all = context.getElementsByTagName("*"),
                elements = [],
                i = 0;
            for (; i < all.length; i++) {
                if (all[i].className && (" " + all[i].className + " ").indexOf(" " + className + " ") > -1 && indexOf.call(elements, all[i]) === -1) elements.push(all[i]);
            }
            return elements;
        })();
        return elems;
    };
    document.getElementsByClassName = function(className) {
        return getElementsByClassName(className, document);
    };

    if(Element) {
        Element.prototype.getElementsByClassName = function(className) {
            return getElementsByClassName(className, this);
        };
    }
}


	var preFunctions = function(idTab){
		TabNow = idTab || null;
		Functions.TabNow = idTab || null;
		return Functions;
	}

	var Functions = {
		TabNow:null,
		slideNow:null,
		action:{			
			tab:function(dataFor){
				dataFor = dataFor || Functions.slideNow;				 
				return {
					content:function(string){										
						var slide = document.querySelector('[data-rel="tab"][data-idtab="'+Functions.TabNow+'"][data-for="'+dataFor+'"]');
						slide.innerHTML = string;
					
					}
				}
			},
			slide:function(dataFor){
				dataFor = dataFor || Functions.slideNow;				 
				return {
					content:function(string){										
						var slide = document.querySelector('[data-rel="slide"][data-idtab="'+Functions.TabNow+'"][data-id="'+dataFor+'"]');
						slide.innerHTML = string;
					
					}
				}
			}

		},
		event:function(e){
			var eArray = e.split(' ');
			return {
				tab:function(dataFor,callback){				
					Functions.slideNow = dataFor;
					Functions.addEvent(window,'load',function(element){
						 var tab = document.querySelector('[data-rel="tab"][data-idtab="'+Functions.TabNow+'"][data-for="'+dataFor+'"]');						
						for (var i = 0;i<eArray.length; i++) {
							Functions.addEvent(tab,eArray[i],function(element){
								if(callback)
									callback(Functions);							
							});
						};
					});
																			
				}
			}		
		},
		addEvent:function(objs,event,callback,mode,elem2,table){
			
			if(mode == undefined)
				mode = true;

			if(objs == undefined)
				objs = window; 
			if(objs.addEventListener){ 				
				return objs.addEventListener(event,function(){
					if(callback)
						callback(objs,elem2,table);
				},mode); 
			}else if(objs.attachEvent){
				return objs.attachEvent('on'+event,function(){
					if(callback)
						callback(objs,elem2,table);
				}); 
			}
		},
		windowSize:function(){
				var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

				var scrollTop  = window.pageYOffset || document.documentElement.scrollTop;
				var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

			    D = document;
			    var y =  Math.max(
			        D.body.scrollHeight, D.documentElement.scrollHeight,
			        D.body.offsetHeight, D.documentElement.offsetHeight,
			        D.body.clientHeight, D.documentElement.clientHeight
			    );


			    var x =  Math.max(
			        D.body.scrollWidth, D.documentElement.scrollWidth,
			        D.body.offsetWidth, D.documentElement.offsetWidth,
			        D.body.clientWidth, D.documentElement.clientWidth
			    );

				var size = {
					document: {
						width: x,
						height: y
					},
					width: width,
					height: height,
					scrollLeft: scrollLeft,
					scrollTop: scrollTop,
					sizing: function(element){

						return {
							width:width-(document.querySelector(element).offsetLeft*2),
							height:height-(document.querySelector(element).offsetTop*2)
						}
					} 
				}

			return size;
		},
		FindByAttr:function(attribute, value,element){
			if(element == undefined)
				element = document;

		  var All = element.getElementsByTagName('*');
		  for (var i = 0; i < All.length; i++)       {
		    if (All[i].getAttribute(attribute) == value) { return All[i]; }
		  }
		},
		openTab:function(idTabNow,dataFor,mode){
			
			if( mode == undefined)
				mode = 'normal';
										
			var tab = document.querySelector('[id="'+idTabNow+'"]').querySelectorAll('[data-rel="tab"][data-idtab="'+idTabNow+'"]');
			var slide = document.querySelector('[id="'+idTabNow+'"]').querySelectorAll('[data-rel="slide"][data-idtab="'+idTabNow+'"]');
			
			for(var i = 0;i<tab.length;i++){							
				if( typeof tab[i] == 'object' ){	
					if(mode == 'normal' )					
						tab[i].setAttribute('data-status','');																							
				}
			}

 			for(var i = 0;i<slide.length;i++){			
				 if( typeof slide[i] == 'object' ){									
					slide[i].setAttribute('data-status','');																							
				 }
			}			
										
			document.querySelector('[data-idtab="'+idTabNow+'"][data-for="'+dataFor+'"]').setAttribute('data-status','active');
			document.querySelector('[data-idtab="'+idTabNow+'"][data-id="'+dataFor+'"]').setAttribute('data-status','active');

								
		},
		init:function(){
			var itabs = document.getElementsByClassName('itabs');

		

			for(var i = 0;i<itabs.length;i++){

					var idTab = 'itabs'+countITabs;

					
					
				if(itabs[i].getAttribute('data-idtab') != null)
					continue;


				if(itabs[i].getAttribute('id') == null){

					itabs[i].setAttribute('id',idTab);
					itabs[i].setAttribute('data-idtab',idTab);
				}else{
					idTab = itabs[i].getAttribute('id');
				}

				var dataStatus_key = '';
				var tab = itabs[i].querySelectorAll('[data-rel="tab"]');
				var slide = itabs[i].querySelectorAll('[data-rel="slide"]');
				
				for(var a = 0;a<slide.length;a++){				
					 if( typeof slide[a] == 'object' ){
						 slide[a].setAttribute('data-idtab',idTab);							
					 }
				}
				
				for(var a = 0;a<tab.length;a++){
					if( typeof tab[a] == 'object' ){
						var dataFor = tab[a].getAttribute('data-for');
						var dataStatus = tab[a].getAttribute('data-status');						

						if(dataStatus == 'active'){
							dataStatus_key = dataFor;														
						}

						tab[a].setAttribute('data-idtab',idTab);	

						Functions.addEvent(tab[a],'click',function(element){
							
							var idTabNow = element.getAttribute('data-idtab');
							var dataFor = element.getAttribute('data-for');
							
							Functions.openTab(idTabNow,dataFor);
						});

					}
					
				}
				
				dataStatus_key = document.querySelector('#'+idTab).parentNode.querySelector('[data-status="active"]').getAttribute('data-for')
				
				Functions.openTab(idTab,dataStatus_key,'init');

				countITabs++;
				
			}
		},
	}


	Functions.addEvent(window,'load',function(){
	
		Functions.init();

		setInterval(function(){
			Functions.init();
		},1000);
	});

	window.itabs = preFunctions;
})();
