# Drawer

::: warning
This part of the documentation is still in construction.
:::

## Drawer Operations
```kotlin
val drawerViewModel = MainActivity.instance?.drawerViewModel

// Read drawer tabs (tabs on top)
drawerViewModel.drawerTabs
drawerViewModel.currentDrawerTabIndex
drawerViewModel.currentDrawerTab
 
// Read service tabs (tabs on bottom)
drawerViewModel.serviceTabs
drawerViewModel.currentServiceTabIndex
drawerViewModel.currentServiceTab

// ...
```

## Register Service Tabs
````kotlin
class MyTab(resources: Resources) : DrawerTab() {

    override fun getName() = "My tab"

    override fun getIcon(): Icon {
        return Icon.ExternalResourceIcon(R.drawable.drawer_ic, resources)
    }

    @Composable
    override fun Content(modifier: Modifier) {
        // Your tab implementation
    }
    
    // ...
}

ServiceTabRegistry.register {
    MyTab(context.resources)
}
````