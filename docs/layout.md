# The Layout

## Root


    <div>
        <context>
            <header/>
            <layout/>
        </context>
    <div/>
    
note that the header will appear in all pages.

you can pass layout as props but if you don't we will use the default layout.

the default layout will be responsible for render routes switch , the routes will be extracted 
from pages config.



## CrudLayout

CurdLayout is the default layout used by this library, it creates routes for defined pages.

    <Switch>
        <Route ... component={IndexPage} />
        ...
    </Switch>
    
the routes will be extracted using `RouteExtractor`

