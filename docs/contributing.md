---
id: contributing
title: "Contributing"
---

# 👋 Welcome

Hello and welcome! Thank you so much for taking the time to contribute to the Tuva Project Knowledge Base. 
People like you have valuable knowledge and experience to share about working with healthcare data and doing 
healthcare analytics and machine learning.  Sharing your knowledge is a great way to help others analyze 
healthcare data.

# 🤝 How to contribute

There are two main ways to contribute to Knowledge:

1. Simple Edit via GitHub
2. Advanced Edit via Docusaurus

## Simple Edit
At the very bottom of every page is a link that says "Edit this page".  
Clicking that link will take you to the source code for that page on GitHub. 
You can directly edit this code and create a pull request. 
This approach is great for making edits within an existing page.

## Advanced Edit
For more advanced changes, e.g. building an entire new section, you'll need to install docusaurus, 
fork the repo, create the changes locally to ensure they build, and then create a pull request.  
Here's a [link](https://github.com/tuva-health/knowledge_base) to the repo for Knowledge Base.

### Using GitHub CodeSpaces to edit
To contribute using GitHub CodeSpaces and not worry about configuring docusaurus on
your local machine, follow the following steps.

1. Fork the repository into your GitHub.

![first_step_create_fork](/img/contributing/create_fork.png)


![second_step_create_fork](/img/contributing/create_fork_2.png)

2. Navigate to your forked repository
   
![navigate_to_forked_repo](/img/contributing/go_to_your_fork.png)


3. Press the period key. A vs code environment should appear. 

![navigate_to_forked_repo](/img/contributing/vs_code_page.png)


4. Click on the left-hand side and select the remote explorer tab.
   Then at the top select GitHub Codespaces if not already selected. 

![navigate_to_forked_repo](/img/contributing/select_github_codespaces.png)


5. Select `Create Codespace`

6. Select the repository with the name `knowledge_base`
7. Select the branch main
8. Select 8GB worth of RAM / 2 cores
9. It may take a while to load, but it should start installing all the software onto the Codespaces. 
You know you are in codespaces and not just the vscode env if the url changes at the top.

![navigate_to_forked_repo](/img/contributing/installing_requirements_example.png)

10. Run the command in the terminal `yarn start` and the webserver should start with the website.
    At the bottom right, you can get the link to view yourself, or you can also click to create a public
    link that can be shared with others.
    Make edits as you would in visual studio code, creating branches
    and pushing back to your GitHub repository on origin. Happy editing!

![yarn_start](/img/contributing/yarn_start.png)

**Note**, although GitHub Codespaces is a paid feature, you should have a certain amount of hours available for you
to use for free.
You should not be required to put a credit card on file to use this service as of 10/30/2023.
https://docs.github.com/en/billing/managing-billing-for-github-codespaces/about-billing-for-github-codespaces#monthly-included-storage-and-core-hours-for-personal-accounts
