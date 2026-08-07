# Custom Screens

In a normal Android app, you would create a new `Activity` for a new screen. However, extensions
cannot dynamically register Activities in the app's `AndroidManifest.xml`, which is required to
launch extensions. To solve this, Xed-Editor provides two APIs:

- `ExtensionScreen` and 
- `MainRouteRegistry`

## What is an ExtensionScreen?

An `ExtensionScreen` works almost exactly like an Activity. It has a lifecycle (onCreate, onStart,
etc.) and allows you to set Compose content. Xed-Editor hosts these screens inside a special
internal Activity.

## Creating a Screen

To create a new screen, extend the `ExtensionScreen` class:

```kotlin
class MyCustomScreen : ExtensionScreen() {
    override fun onCreate(savedInstanceState: Bundle?) {
        setContent {
            // Your Compose UI here
            Column {
                Text("Welcome to my custom screen!")
                Button(onClick = { finish() }) {
                    Text("Go Back")
                }
            }
        }
    }
}
```

## Starting a Screen

You can start your new screen from anywhere using the `ExtensionContext`:

```kotlin
context.startScreen(MyCustomScreen())
```

## Main Routes

An alternative to creating screens is to create a custom main route with `MainRouteRegistry`.

The advantage is that this user interface is rendered within the standard `MainActivity`, meaning no
new external activity is opened.
However, the disadvantage is that this screen must be manually unregistered via
`MainRouteRegistry.unregisterRoute(...)` and may be less flexible than a custom screen.

The registration is similar to the [settings routes](/docs/extensions/settings.md#global-settings):

```kotlin
val route = DynamicRoute(
    route = "my_feature_route",
    arguments = emptyList(),
    content = { navController, backStackEntry ->
        // This is where your screen content goes
        MyScreenUI()
    }
)

MainRouteRegistry.registerRoute(route)
```

You can go to your new route by using the corresponding `NavHostController`:
```kotlin
mainNavController.navigate("my_feature_route")
```

