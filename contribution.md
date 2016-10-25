# Contribution Guide

Please read and follow our Code of Conduct.

### Have a Question, Problem, or Idea?

If you have questions or ideas regarding i-bet365, please direct these to info@isitech.biz.

Otherwise, do you:

1.  Found a Bug ?
2.  Want a Feature ?


#### 1. Found a Bug or Issue?

If you find a bug in the source code or a mistake in the documentation, we recommend that you first review the Online Documentation.

Otherwise you can help us improve by submitting an issue to our GitHub Repository. Even better you can submit a Pull Request with a fix. Your custom changes can be crafted in a repository fork and submitted to the GitHub Repository as a Pull Request.

Important: Please review the Submission Guidelines below, before contributing to the project.
#### 2. Want a Feature?

You can request a new feature by submitting an issue. If you would like to implement a new feature then consider what kind of change it is:

Major Changes that you wish to contribute to the project should be discussed first on info@isitech.biz, so that we can better coordinate our efforts, prevent duplication of work, and help you to craft the change so that it is successfully accepted into the project.
Small Changes can be crafted and submitted to the GitHub Repository as a Pull Request.
## Issue Guidelines

We're not actively reviewing unsolicited PRs from the community, although we welcome your feature requests, doc corrections, and issue reports. If you're thinking of contributing code or docs to the project, please review Submitting Pull Requests before beginning any work.

### Submitting an Issue

Before you submit your issue, search the issues archive; maybe your question was already answered. If your issue appears to be a bug, and hasn't been reported, open a new issue.

Do not report duplicate issues; help us maximize the effort we can spend fixing issues and adding new features.

Please check with us via the discussion forum before investing significant effort in a planned Pull Request submission; it's likely that we are already working on a related PR.


## Git Commit Guidelines

We have very precise rules over how our git commit messages can be formatted. This leads to more readable messages that are easy to follow when looking through the project history. It is important to note that we use the git commit messages to generate the Changelog document.

A detailed explanation of guidelines and conventions can be found in this document.
Commit Message Format

Each commit message consists of a header, a body and a footer. The header has a special format that includes a type, a scope and a subject:
```sh
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```
Any line of the commit message cannot be longer 100 characters!
This allows the message to be easier to read on github as well as in various git tools.
Type

Must be one of the following:

- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing tests
- chore: Changes to the build process or auxiliary tools and libraries such as documentation generation

###### Scope

The scope could be anything specifying the place of the commit change.

###### Subject

The subject contains succinct description of the change:

use the imperative, present tense: "change" not "changed" nor "changes"
don't capitalize first letter
no dot (.) at the end
###### Body

Just as in the subject, use the imperative, present tense: "change" not "changed" nor "changes" The body should include the motivation for the change and contrast this with previous behavior.

###### Footer

The footer should contain any information about Breaking Changes and is also the place to reference GitHub issues that this commit Closes.

Breaking Changes are intended to highlight (in the ChangeLog) changes that will require community users to modify their code with this commit.
