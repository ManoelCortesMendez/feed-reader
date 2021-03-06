/* eslint-env jquery, jasmine */

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* Test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('have a url', function () {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      });
    });

    /* Test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('have a name', function () {
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      });
    });
  });


  /* Test suite named "The menu" */
  describe('The menu', function() {
    const body = document.body;
    const menuIcon = document.getElementsByClassName('menu-icon-link')[0];

    /* Test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    it('is hidden by default', function () {
      expect(body.classList).toContain('menu-hidden');
    });

    /* Test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('toggles visibility on menu icon click', function () {
      // Click on menu icon and check if it shows
      menuIcon.click();
      expect(body.classList).not.toContain('menu-hidden');
      // Click again on menu icon and check if it hides again
      menuIcon.click();
      expect(body.classList).toContain('menu-hidden');
    });
  });

  /* Test suite named "Initial Entries" */
  describe('Initial Entries', function () {
    const feed = document.getElementsByClassName('feed')[0];

    beforeEach(function (done) {
      loadFeed(0, done);
    });

    /* Test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    it('has at least one entry', function () {
      expect(feed.querySelectorAll('.feed .entry').length).toBeGreaterThan(0);
    });
  });

  /* Test suite named "New Feed Selection" */
  describe('News Feed Selection', function () {
    const feed = document.getElementsByClassName('feed')[0];
    let feedBefore;
    let feedAfter;

    beforeEach(function (done) {
      // Load 1st feed and, in the loadFeed callback, save the feed content
      loadFeed(0, function () {
        feedBefore = feed.innerHTML;
        // Load 2nd feed again and, in the loadFeed callback, save the feed content
        loadFeed(1, function () {
          feedAfter = feed.innerHTML;
          done(); // Signal completion of nested async functions
        });
      });
    });

    /* Test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    it('should change content when feed changes', function () {
      // Uncomment lines below to see before and after in console
      // console.log(feedBefore);
      // console.log('----------------------------------------');
      // console.log(feedAfter);

      expect(feedAfter).not.toBe(feedBefore);
    });
  });
}());
