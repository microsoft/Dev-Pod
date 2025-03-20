# Language Structure Guidelines for Dev Pods Repository

## Primary Language

The primary language for all main content in this repository is **English**. This includes:

- Main README.md files
- Core documentation
- Code comments
- Issue templates
- Pull request templates
- Contribution guidelines
- Workshop materials

## Translation Structure

We maintain translations in two additional languages:

1. Portuguese (Brazil) - `pt-BR`
2. Spanish (Latin America) - `es-LATAM`

### Directory Structure

For each content section, we follow this structure:

```
📁 content-directory/
│
├── 📄 README.md                # Primary content in English
├── 📄 other-files.md           # Other English content
│
├── 📁 translations/            # All translations
│   │
│   ├── 📁 pt-BR/               # Portuguese (Brazil) translations
│   │   ├── 📄 README.md        # Translated version of main README
│   │   └── 📄 other-files.md   # Other translated content
│   │
│   └── 📁 es-LATAM/            # Spanish (Latin America) translations
│       ├── 📄 README.md        # Translated version of main README
│       └── 📄 other-files.md   # Other translated content
```

### Translation Naming Convention

Translated files should maintain the same filename as their English counterparts but be placed in the appropriate language directory. For example:

- English: `/docs/kpis.md`
- Portuguese: `/docs/translations/pt-BR/kpis.md`
- Spanish: `/docs/translations/es-LATAM/kpis.md`

## Translation Status

Each translated directory should include a `TRANSLATION_STATUS.md` file that tracks:

1. Which files have been translated
2. Last update date for each translation
3. Translation contributors
4. Any content that still needs translation

## Root Directory Translation References

The root `README.md` should include links to the translated versions of itself:

```markdown
# Dev Pods Program

[🇧🇷 Português (Brasil)](./translations/pt-BR/README.md) | 
[🇪🇸 Español (Latinoamérica)](./translations/es-LATAM/README.md)

...rest of content...
```

## Content Synchronization Policy

**IMPORTANT**: All changes made to English documents must be immediately replicated to all translation versions. This ensures that all language versions remain consistent and up-to-date.

When updating content:

1. First, make the necessary changes to the English version of the document
2. Immediately update all translations with the equivalent changes
3. Update the "Last translation update" date in the version tracking note of each translated file
4. Update the TRANSLATION_STATUS.md file in each language directory

For substantial changes, create a single pull request that includes both the English updates and all corresponding translation updates.

## Complete Repository Structure Example

```
📁 Dev-Pods/
│
├── 📄 README.md                # Main English README
├── 📄 LICENSE                  # License (remains untranslated)
├── 📄 CODE_OF_CONDUCT.md       # English Code of Conduct
├── 📄 CONTRIBUTING.md          # English Contributing Guide
├── 📄 LANGUAGE_STRUCTURE.md    # This document
│
├── 📁 translations/            # Root-level translations
│   │
│   ├── 📁 pt-BR/               # Portuguese translations
│   │   ├── 📄 README.md
│   │   ├── 📄 CODE_OF_CONDUCT.md
│   │   ├── 📄 CONTRIBUTING.md
│   │   └── 📄 TRANSLATION_STATUS.md
│   │
│   └── 📁 es-LATAM/            # Spanish translations
│       ├── 📄 README.md
│       ├── 📄 CODE_OF_CONDUCT.md
│       ├── 📄 CONTRIBUTING.md
│       └── 📄 TRANSLATION_STATUS.md
│
├── 📁 docs/                    # Documentation (English)
│   ├── 📄 overview.md          # All English documentation
│   │   ...
│   └── 📁 translations/        # Translated documentation
│       ├── 📁 pt-BR/
│       │   ├── 📄 overview.md
│       │   └── 📄 TRANSLATION_STATUS.md
│       └── 📁 es-LATAM/
│           ├── 📄 overview.md
│           └── 📄 TRANSLATION_STATUS.md
│
└── 📁 workshops/               # Workshop content (English)
    ├── 📄 index.md             # All English workshop content
    │   ...
    └── 📁 translations/        # Translated workshop content
        ├── 📁 pt-BR/
        │   ├── 📄 index.md
        │   └── 📄 TRANSLATION_STATUS.md
        └── 📁 es-LATAM/
            ├── 📄 index.md
            └── 📄 TRANSLATION_STATUS.md
```

## Translation Guidelines

1. **Maintain Formatting**: Preserve all Markdown formatting, links, and structure from the original English content.

2. **Update Internal Links**: Make sure internal links point to the correct translated version of the document.

3. **Keep Technical Terms**: Some technical terms should remain in English, particularly:
   - GitHub-specific terminology
   - Programming language names
   - Tool names and commands
   - API references

4. **Cultural Adaptation**: Adapt examples and cultural references appropriately for the target language while maintaining the same technical content.

5. **Version Tracking**: Each translated file should include a version tracking note at the top:

```markdown
<!--
Original file: /path/to/english/file.md
English version: [commit hash or date]
Last translation update: YYYY-MM-DD
Translated by: [translator name/github username]
-->
```

## Translation Contribution Workflow

1. Check the `TRANSLATION_STATUS.md` in the relevant language directory to see what needs translation.
2. Create a new branch for your translation work.
3. Translate the content following the guidelines above.
4. Update the `TRANSLATION_STATUS.md` file with your changes.
5. Submit a pull request with your translations.

## Translation Maintenance

All translations should be reviewed and updated if the original English content changes significantly. The English version is always considered the authoritative source.

## Translation Tooling

We recommend using consistent terminology for technical terms. A glossary of recommended translations for technical terms will be provided in each language directory.
