# SWE-632-Project

# <i>MetaTier</i>

A collaborative application for ranking lists of items in tiers from best to worst. This application makes it easy to find and rank different lists of items, and compare your ranking to those of your friends, and to the global average.

Each day, <i>MetaTier</i> will release one new "daily" list of items, similar to the daily Wordle puzzle, or the daily snapshot taken on the social media application BeReal. Users must complete their daily ranking before continuing on to the main site.

## Tech
- The browser-based user interface is implemented using React.js. 
- The backend of the application is a RESTful API implemented using Python's FastAPI library, and is being publicly exposed via ngrok reverse proxy.

## Deployment
The app is publicly available here:
https://angelina-daniel12.github.io/SWE-632-Project/ 

## Workflow
- Clone
- Create a branch for your changes
- Open a PR when ready

## Starting local FastAPI server
- python -m uvicorn main:app --reload
