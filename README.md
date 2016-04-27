<h1>Tabs Responsible - iTabs - v1.1</h1>
Plugin javascript to use tabs to separate content
<p>Developed by Wallace Rio <wallrio@gmail.com></p>
<hr>

<h3>Cross-Browser</h3>
<p>Tested on Firefox 45 / IE 8 / Opera 12 / Chrome 38 / Safari 5</p>

<h3>Use</h3>
<p>Insert script tag and link tag into your head document html</p>

	<link  rel="stylesheet" href="itabs.css">
	<script type="text/javascript" src="itabs.js"></script>


<h3>Change the style on css file (itabs.css)</h3>
<p>Is recommend include other file css for changes</p>

<h3>Example</h3>

<h5>Tabs default</h5>
<p>Insert markup below:</p>

	<div class="itabs tabFlat">
		
		<div data-rel="tabs" >
			<a data-rel="tab" data-for="view1" data-status="active">view1</a>
			<a data-rel="tab" data-for="view2" disabled="disabled">view2</a>
			<a data-rel="tab" data-for="view3"  >view3</a>
		</div>

		<div data-rel="slides">
			<div data-rel="slide" data-id="view1"   >
				view 1
			</div>
			<div data-rel="slide" data-id="view2">
				view 2
			</div>
			<div data-rel="slide" data-id="view3" >
				view 3
			</div>
		</div>

	</div>

<h5>Example 2 - Action run-time</h5>
<p>click on second tab for visualize the action</p>

<div class="itabs tabFlat" id="ajax" >
		
		<div data-rel="tabs" >
			<a data-rel="tab" data-for="view1a" data-status="active">view1</a>
			<a data-rel="tab" data-for="view2b" disabled="disabled">view2</a>
			<a data-rel="tab" data-for="view3c"  >view3</a>
		</div>

		<div data-rel="slides">
			<div data-rel="slide" data-id="view1a"   >
				1	
			</div>
			<div data-rel="slide" data-id="view2b">
				2
			</div>
			<div data-rel="slide" data-id="view3c" >
				3
			</div>
		</div>

	</div>


<h3>Using a script</h3>
	
	<script type="text/javascript">
		itabs('ajax').event('click').tab('view2b',function(e){
			e.action.tab().content('tab new');		
			e.action.slide().content('content new');					
		});
	</script>




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
