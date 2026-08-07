# Working with Resources

Resources like strings, icons, and colors should be kept in your extension's resource files instead
of being hardcoded in your Kotlin code. This makes your extension easier to translate and maintain.

## Extension Resources

To access resources that are part of your extension (defined in your `res/` folder), use
`context.resources`:

This property returns a standard Android `Resources` object:

```kotlin
val welcomeMessage = context.resources.getString(R.string.welcome_msg)
val primaryColor = context.resources.getColor(R.color.primary)
```

:::tip
Always put your text in `strings.xml`. When you submit your extension, it will be much easier for
the community to help translate it into different languages.
:::

## Host App Resources

Sometimes you need to access resources from Xed-Editor itself. Since you don't have access to the
app's `R` class, you have to use the `appResources` property:

It's methods always take the name of the resource instead of the ID, allowing you to
access app resources from your extension without the `R` ID mappings.

```kotlin
// Access the app name (either Xed-Editor or Xed-Debug depending on the build)
val appName: String? = context.appResources.getString("app_name")

// ...or just get the ID
val appNameId: Int? = context.appResources.getStringId("app_name")
```

Please note that the return value of the `appResources` methods can be `null`, because we cannot
guarantee that this resource still exists. We might remove certain resources in the future without
warning, so be cautious with using these methods and provide a fallback if possible.

## Icon API

Xed-Editor has a special `Icon` API to handle different types of icons in the UI.
This class will often be used in commands, file types, and other UI components.

- **ResourceIcon**: Use an icon from the app's resources.
- **ExternalResourceIcon**: Use an icon from your extension resources.
- **VectorIcon**: Use an icon from an Android `ImageVector` object.
- **SvgIcon**: Use an icon from an Android SVG `File`.
- **TextIcon**: Show a text icon in the UI.

Most of the time you will use `ResourceIcon` and `ExternalResourceIcon`, the rest are only mentioned
for completeness.

```kotlin
// Using an icon from your resources
val myIcon = Icon.ExternalResourceIcon(R.drawable.my_icon, context.resources)

// Using an icon from the app's resources
val iconId = context.appResources.getDrawableId("xed_editor")
val xedIcon = Icon.ResourceIcon(iconId)
```

You can pass these icons to commands, file types, and other UI components.

Once you have obtained such an object, you can use the `XedIcon` composable to display it in
the UI.

For instance, see this example from the guide on [BuiltInFileType](/docs/extensions/general/file-type.md#builtinfiletype):
```kotlin
@Composable
fun KotlinIcon() {
    XedIcon(
        icon = BuiltinFileType.KOTLIN.icon!!,
        modifier = Modifier.size(48.dp)
    )
}
```