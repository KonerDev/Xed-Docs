import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: '/Xed-Docs/',
    title: 'Xed-Docs',
    description: 'Documentation of Xed-Editor',
    ignoreDeadLinks: [/^https?:\/\/localhost/],
    themeConfig: {
        search: {
            provider: 'local',
        },
        // https://vitepress.dev/reference/default-theme-config
        sidebar: [
            {
                text: 'Getting Started',
                items: [
                    { text: 'Download', link: '/docs/download' },
                    { text: 'Quick Start', link: '/docs/quick-start' },
                    { text: 'Editor Overview', link: '/docs/editor-overview' },
                ],
            },
            {
                text: 'User Guide',
                items: [
                    { text: 'Terminal', link: '/docs/terminal/' },
                    { text: 'Runners', link: '/docs/runners/' },
                    { text: 'Git Integration', link: '/docs/git/' },
                    {
                        text: 'Language Servers',
                        items: [
                            { text: 'Introduction', link: '/docs/lsp/' },
                            { text: 'Builtin Servers', link: '/docs/lsp/builtin-servers' },
                            { text: 'External Servers', link: '/docs/lsp/external-servers' },
                            { text: 'Report Issues', link: '/docs/lsp/report-issues' },
                        ],
                    },
                ],
            },
            {
                text: 'Developer Guide',
                items: [
                    {
                        text: 'Extension Development',
                        items: [
                            { text: 'Introduction', link: '/docs/extensions/' },
                            { text: 'Environment Setup', link: '/docs/extensions/build-setup' },
                            { text: 'Manifest File', link: '/docs/extensions/manifest-file' },
                            { text: 'Lifecycle Hooks', link: '/docs/extensions/lifecycle-hooks' },
                            { text: 'Entry class & Context', link: '/docs/extensions/entry-context' },
                            { text: 'Settings', link: '/docs/extensions/settings' },
                            { text: 'Publishing Extension', link: '/docs/extensions/publishing' },
                        ],
                    },
                    { text: 'Themes', link: '/docs/themes/' },
                    { text: 'Icon Packs', link: '/docs/icon-packs/' },
                ],
            },
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/Xed-Editor/Xed-Editor' },
            { icon: 'discord', link: 'https://discord.gg/6bKzcQRuef' },
            { icon: 'telegram', link: 'https://t.me/XedEditor' },
        ],
    },
});
