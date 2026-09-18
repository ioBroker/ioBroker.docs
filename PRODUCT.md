# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are **smart-home end users** who run or want to run ioBroker at home — hobbyists and prosumers automating their house. Their core job on this site is to **get ioBroker installed and running**, then set up the adapters they need and look things up during operation. The site also carries adapter-developer documentation (API, jsonConfig, developer guides), but developers are a secondary audience: end-user success comes first.

## Product Purpose

ioBroker.docs is the official documentation website and lightweight CMS for the ioBroker open-source smart-home platform, served at https://www.iobroker.net. It turns multilingual markdown documentation and adapter READMEs into a searchable website so that users can learn what ioBroker is, install it, discover and configure adapters, read guides and blog posts, and view platform/adapter statistics. Success means a new user gets from "what is this" to a working ioBroker installation, and existing users can quickly find the answer they need.

## Positioning

ioBroker is an open-source, open-architecture smart-home automation platform with an adapter model: adapters are the translators between ioBroker and devices, protocols, and online services, and users install only what they need. It is strongly rooted in the German-speaking community. The documentation site's position is to be the single official, multilingual, GitHub-backed reference that stays in sync with the adapter ecosystem — not a marketing site and not a third-party wiki.

## Operating Context

- Content pipeline processes markdown from `docs/<lang>/` plus adapter READMEs downloaded from GitHub, translated across languages (English is the base language), and built into a React SPA.
- Users arrive to: install ioBroker, browse/search the ~400+ adapters, read a specific adapter's documentation, follow guides, read the blog, or check statistics.
- Key surfaces: HomePage, InstallationPage, AdaptersPage / AdapterPage, DocsPage, BlogPage, SearchPage, StatisticsPage, ProductOverviewPage, LegalPage, NotFoundPage.
- "Edit on GitHub" links documentation back to its source repositories for community contribution.

## Capabilities and Constraints

- **Multilingual: de, en, ru, zh-cn must be preserved.** German is the core community language; English is the translation base.
- Full-text search across documentation (MiniSearch backend, `GET /search?ln=&q=`).
- Adapter catalog with per-adapter pages, badges, version history, license, and installation/usage statistics (charts).
- Adapter documentation is sourced from GitHub READMEs; the "Edit on GitHub" contribution path must remain.
- Blog and FAQ content pipelines.
- Dark mode supported.
- Node.js >= 22.19 for the build pipeline.

## Brand Commitments

- **ioBroker name, logo, and visual identity (ioBroker GmbH) are binding.** The ioBroker title logo (`assets/img/ioBroker-Title2.svg`) represents the brand.
- Tone is that of an open-source project reference: helpful, factual, community-oriented.

## Evidence on Hand

- Real product content: the full `docs/` documentation tree in four languages, live adapter READMEs, blog posts under `/blog/`, and FAQ.
- Real usage/adapter statistics feed the StatisticsPage and per-adapter stats.
- No fabricated testimonials, customer logos, benchmarks, or pricing exist and future work must not invent any — ioBroker is a free open-source platform.

## Product Principles

- **Installation success is the north star.** Reduce friction from arrival to a running system.
- **Stay faithful to source.** Documentation mirrors GitHub-sourced content; do not invent capabilities an adapter does not have.
- **Multilingual parity.** German-first community reality, with de/en/ru/zh-cn kept usable.
- **Open and contributable.** Preserve the path back to GitHub for every documented adapter.
- **Reference over marketing.** Optimize for finding and understanding, not persuasion.

## Accessibility & Inclusion

Multilingual by requirement (de/en/ru/zh-cn). No further product-specific accessibility standard was established at init; treat WCAG-reasonable defaults as the working baseline until stated otherwise.

## Legal

Imprint (Impressum), Privacy (Datenschutz), and a cookie hint are required under German law and must remain reachable (LegalPage).
