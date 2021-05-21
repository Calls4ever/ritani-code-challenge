# GitHub User Look Up
## User Stories
1. As a user, I should be able switch to dark mode or light mode from any where.
2. As a user I should be able to enter user name in an input and search that user by pressing enter
3. As a user I should be able to see loading animation while waiting for the data to be rendered.
4. As a user I should be able to see the details of the user like and list of first 30 followers if exist.
5. As a user I should be redirected to the GitHub page of the user when click on the username.
6. As a user I can see a reload button at the end of the followers list if there are more followers and clicking it should render another up to 30 followers
7. As a user I should not see the load more button if all the followers are rendered
8. As I user I can click on a user from the follower list and see the details of that user.

## Challenges And Approaches 

Getting the `follower count` is most challenging task. Since there is no `property` in the user detail returned from the API, the only choice I had was to get all the followers and store them in an array, and render the size of the array. Again, there were lots of challenges doing so. By default, the API returns first 30 followers per request. 
### Approach 1
I sent get request iteratively until there are no more followers to get. It worked pretty good for users having few to few hundreds followers, but when it comes to user having tens and thousands of followers, my API call rate get exhausted and had to wait for another hour to reset. 
*(This made me to take so long to finish the project)*
### Approach 2
I increased the number of followers to fetch in each request using `pagination` with `per_page`, but I took few seconds to load the users having large amount of followers.
### Approach 3 (Final)
Instead of displaying the follower counts of the user, I rendered the the number of followers displayed and it will increase as user load more followers

