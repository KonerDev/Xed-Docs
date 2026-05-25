---
lang: en-US
title: Report Issues
---

# Report Issues

If you encounter problems such as the error message *"Unable to connect to language server"* when
opening a file or if certain features are not working as expected, you can debug and report the
issue using the built-in tools.

## Finding the problem

Go to:

**Settings → Editor → Manage language servers**

Select the language server you are using and inspect its instances. In most cases, you will find at
least one instance listed.

Look for an instance with a status such as **Error** or **Crash**. Click on that instance to open
its log page.

## Checking logs

Inside the log page, you can view detailed logs for the selected instance.

At the top, there is a toolbar that lets you filter which logs are shown. Developers may switch this
to **Debug** for more detailed output, but this is optional for regular users.

## Troubleshooting

Before reporting, you can try:

- Restarting the language server
- Retrying the action that caused the issue
- Check for updates of Xed-Editor and the affected language server

## Reporting the issue

In the top-right corner of the log page, click the **Report issue** button.

This will automatically open a GitHub issue template where you can submit the problem. The report
helps us analyze and fix the issue more effectively.

## When no clear error is visible

If you cannot find any instance marked as error or crash, check all available instances for unusual
behavior or warnings.

If nothing looks suspicious, the issue may not be caused by the editor itself but by the language
server implementation. You can still report it on GitHub if needed.