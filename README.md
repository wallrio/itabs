<h1>Tabs Responsible - iTabs - v1.13</h1>
Plugin javascript to use tabs to separate content
<p>Developed by Wallace Rio <wallrio@gmail.com></p>
    wallrio@gmail.com
<hr>

<h3>Cross-Browser</h3>
<p>Tested on Firefox v48 /Chrome v38</p>

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

<h5>Example 2 - action on click tab</h5>
<p>click on tab for visualize the action</p>

	<div class="itabs tabFlat" id="itab1" data-tabclick="function(){alert('tab clicked');}" >		
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



<h5>Example 3 - tab inside on tab</h5>
<p>Insert tag of tab inside other tab changing the attributes, 'id' if exist, 'data-for' and 'data-id'</p>

	<div class="itabs tabFlat"  >		
		<div data-rel="tabs" >
			<a data-rel="tab" data-for="view1b" data-status="active">view 1 b</a>
			<a data-rel="tab" data-for="view2b" >view 2 b</a>
			<a data-rel="tab" data-for="view3b"  >view 3 b</a>
		</div>
		<div data-rel="slides">
			<div data-rel="slide" data-id="view1b"   >
				
				<div class="itabs tabFlat"  >		
						<div data-rel="tabs" >
							<a data-rel="tab" data-for="view1c" >view 1 c</a>
							<a data-rel="tab" data-for="view2c" data-status="active">view 2 c</a>
							<a data-rel="tab" data-for="view3c"  >view 3 c</a>
						</div>
						<div data-rel="slides">
							<div data-rel="slide" data-id="view1c"   >
								view 1 c	
							</div>
							<div data-rel="slide" data-id="view2c">
								view 2 c
							</div>
							<div data-rel="slide" data-id="view3c" >
								view 3 c
							</div>
						</div>
				</div>
				
			</div>
			<div data-rel="slide" data-id="view2b">
				view 2 b
			</div>
			<div data-rel="slide" data-id="view3b" >
				view 3 b
			</div>
		</div>
	</div>

<hr>

<h5>Example 4 - Hash on address bar</h5>
	<p>With click of tab was automatic insert hash by id tab on address bar</p>
<p>Insert attributes 'data-hash="true"' for use hash</p>

	<div class="itabs tabFlat" data-hash="true">     
        <div data-rel="tabs" >
            <a data-rel="tab" data-for="view1" data-status="active"  >
            	view 1
            </a>
            <a data-rel="tab" data-for="view2">
        		view 2
        	</a>
            </div>
        <div data-rel="slides">
            <div data-rel="slide" data-id="view1">view 1</div>
            <div data-rel="slide" data-id="view2">view 2</div>
        </div>
    </div>


<h5>Example 5 - Execute javascript on tabclick with get parameters</h5>
	<p>With click of tab is run code defined on tag first itabs with attribute 'data-tabclick'</p>

	<div class="itabs tabFlat" data-tabclick="function(value){alert(JSON.stringify(value));}">     
        <div data-rel="tabs" >
            <a data-rel="tab" data-for="view1" data-status="active"  >view 1</a>
            <a data-rel="tab" data-for="view2">view 2</a>
            </div>
        <div data-rel="slides">
            <div data-rel="slide" data-id="view1">view 1</div>
            <div data-rel="slide" data-id="view2">view 2</div>
        </div>
    </div>    

    OBS: the content of value is JSON.
    	{
    		"tab":{
	    		"name":"name_of_tab",
	    		"content":"content_of_tab",
                "element":"element_tab_DOM"
    		},
    		"slide":{
    			"name":"name_of_slide",
    			"content":"content_of_slide",
                "element":"element_slide_DOM"
    		}
    	}



    <h5>Example 6 - Create a Banner Slider Automatic transition with progress bar</h5>
    <p>Use markup similary above and use on style class for banner</p>

    <div class="itabs tabBanner" id="itabBanner" data-autoslide="7000">
        <div data-rel="progress">
            <span></span>
        </div>

        <div data-rel="tabs" >            
                <a data-rel="tab" data-for="view1" data-status="active" >1</a>
                <a data-rel="tab" data-for="view2" >2</a>         
        </div>
                 
        <div data-rel="slides">
            <div data-rel="slide" data-id="view1"  style="background:url(image_path);" >
                <p>content slider 1</p>
            </div>
            <div data-rel="slide" data-id="view1"  style="background:url(image_path);" >
                <p>content slider 2</p>
            </div>
        </div>
    </div>

           
<hr>

<h3>Using a script</h3>
	
    <h2>Change content</h2>

    <script type="text/javascript">
        itabs('tab1').event('click').tab(function(e){     
            e.action.tab().content('tab new');      
            e.action.slide().content('content new');                    
        });
    </script>

    <h2>Get content</h2>

    <script type="text/javascript">
        itabs('tab1').event('click').tab(function(e){     
            alert(e.action.tab().content());      
            alert(e.action.slide().content());                    
        });
    </script>

    <h2>Change content on tag spedific</h2>

    <script type="text/javascript">
        itabs('tab1').event('click').tab(function(e){     
            e.action.tab().content('tab new');      
            e.action.slide().content('content new');                    
        },id_of_tab);
    </script>

    <h2>Get id of tab click</h2>

    <script type="text/javascript">
        itabs('tab1').event('click').tab(function(e){     
            alert(e.slideNow);                 
        },id_of_tab);
    </script>

    <h2>Change tab or content without of itab </h2>

    <script type="text/javascript">
       itabs('tab1').action.tab(id_of_tab).content('tab new');      
       itabs('tab1').action.slide(id_of_tab).content('content new');
    </script>

    <h2>Run after itab ready</h2>

    itabs('itabMe').ready(function(){                                           
        // code javascript                      
    })                    

    <h2>Add tab on run-time</h2>

    itabs('tabs1').addTab({'title':'title_of_tab','for':'id_of_tab'},function(act){
            act.html(slideHtml,function(){
                // code javascript run after set content
            }); 
    },boolen_if_open_tab_after_create,html_join_tab_title,function_anonimous_on_click_tab);


    <h2>Del tab on run-time</h2>
  
    itabs('tabs1').delTab('id_of_tab',function(){                                                 
            // code javascript run after delete tab
        return true;
    });

    <h2>Edit tab on run-time</h2>
  
    itabs('tabs1').editTab('id_of_tab','title_of_tab',function(){                                                 
            // code javascript run after edit tab
        return true;
    });


    <h2>Get current tab information</h2>
  
    itabs('itabMe').event('click').tab(function(e){   
        // e = object content general information of itab
        // e.get() = object content information of current tab        
        alert(e.get().tab.name);
    });
