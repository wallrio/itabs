<h1>Tabs Responsible - iTabs - v1.1</h1>
Plugin javascript to use tabs to separate content
<p>Developed by Wallace Rio <wallrio@gmail.com></p>
<hr>

<h3>Cross-Browser</h3>
<p>Tested on Firefox 45 / IE 8 / Opera 12 / Chrome 38 / Safari 5</p>

<h3>Use</h3>
<p>Insert script tag and link tag into your head document html</p>

	&lt;link  rel="stylesheet" href="itabs.css"&gt;
	&lt;script type="text/javascript" src="itabs.js"&gt;&lt;/script&gt;


<h3>Change the style on css file (itabs.css)</h3>
<p>Is recommend include other file css for changes</p>

<h3>Example</h3>

<h5>Tabs default</h5>
<p>Insert markup below:</p>

	&lt;div class="itabs tabFlat"&gt;
		
		&lt;div data-rel="tabs" &gt;
			&lt;a data-rel="tab" data-for="view1" data-status="active"&gt;view1&lt;/a&gt;
			&lt;a data-rel="tab" data-for="view2" disabled="disabled"&gt;view2&lt;/a&gt;
			&lt;a data-rel="tab" data-for="view3"  &gt;view3&lt;/a&gt;
		&lt;/div&gt;

		&lt;div data-rel="slides"&gt;
			&lt;div data-rel="slide" data-id="view1"   &gt;
				view 1
			&lt;/div&gt;
			&lt;div data-rel="slide" data-id="view2"&gt;
				view 2
			&lt;/div&gt;
			&lt;div data-rel="slide" data-id="view3" &gt;
				view 3
			&lt;/div&gt;
		&lt;/div&gt;

	&lt;/div&gt;

<h5>Example 2 - Action run-time</h5>
<p>click on second tab for visualize the action</p>

&lt;div class="itabs tabFlat" id="ajax" &gt;
		
		&lt;div data-rel="tabs" &gt;
			&lt;a data-rel="tab" data-for="view1a" data-status="active"&gt;view1&lt;/a&gt;
			&lt;a data-rel="tab" data-for="view2b" disabled="disabled"&gt;view2&lt;/a&gt;
			&lt;a data-rel="tab" data-for="view3c"  &gt;view3&lt;/a&gt;
		&lt;/div&gt;

		&lt;div data-rel="slides"&gt;
			&lt;div data-rel="slide" data-id="view1a"   &gt;
				1	
			&lt;/div&gt;
			&lt;div data-rel="slide" data-id="view2b"&gt;
				2
			&lt;/div&gt;
			&lt;div data-rel="slide" data-id="view3c" &gt;
				3
			&lt;/div&gt;
		&lt;/div&gt;

	&lt;/div&gt;


<h3>Using a script</h3>
	
	&lt;script type="text/javascript"&gt;
		itabs('ajax').event('click').tab('view2b',function(e){
			e.action.tab().content('tab new');		
			e.action.slide().content('content new');					
		});
	&lt;/script&gt;




<h3>API - javascript</h3>

<h4>Action on click of tab</h4>	

itabs('ajax').event('click').tab('view2b',function(e){
	// insert you action here
});

<h4>Change title of tab</h4>	
	
	e.action.tab('data-for_of_tab').content('content');
	
	or

	e.action.tab().content('content'); // this command get tab fron function clousure event

	or

	itabs('id_of_tabWrapper').action.tab('data-for_of_tab').content('content');		

	or

	itabs('id_of_tabWrapper').action.tab('data-for_of_tab').content('content');	


<h4>Change title of slide</h4>	

	e.action.slide('data-id_of_slide').content('content');
	
	or

	e.action.slide().content('content'); // this command get tab fron function clousure event

	or

	itabs('id_of_tabWrapper').action.slide('data-id_of_slide').content('content');		

	or

	itabs('id_of_tabWrapper').action.slide('data-id_of_slide').content('content');	
