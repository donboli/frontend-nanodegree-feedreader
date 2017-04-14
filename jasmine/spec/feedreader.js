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

    describe('RSS Feeds', function() {
        // Make sure the allFeeds variable has been defined and that it is not empty.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Ensure every feed has a URL defined and that the URL is not empty.
        it('have URLs', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBeNull();
                expect(feed.url).not.toBe('');
            });
        });

        // Ensure every feed has a name defined and that the name is not empty.
        it('have names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBeNull();
                expect(feed.name).not.toBe('');
            });
        });
    });

    describe('The menu', function(argument) {
        // Ensure the menu element is hidden by default.
        it('is hidden by default', function() {
            expect($('body')).toHaveClass('menu-hidden');
        });

        // Ensure the menu changes visibility when the menu icon is clicked.
        it('toggles visibility when the menu icon gets clicked', function() {
            var $body = $('body');
            var $menuIconLink = $('.menu-icon-link');

            $menuIconLink.click();
            expect($body).not.toHaveClass('menu-hidden');
            $menuIconLink.click();
            expect($body).toHaveClass('menu-hidden');
        });
    });

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* Ensure when the loadFeed function is called and completes its work,
         * there is at least a single .entry element within the .feed container.
         */
        it('have at least one entry', function() {
            var $entries = $(".feed .entry");
            expect($entries.length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* Ensure when a new feed is loaded by the loadFeed function that the
         * content actually changes.
         */
        it('changes the content', function(done) {
            var $initialFeedContent = $(".feed").html();

            loadFeed(1, function() {
                var $finalFeedContent = $(".feed").html();
                expect($initialFeedContent).not.toEqual($finalFeedContent);
                done();
            });
        });
    });

    describe('Unknown Feed Request', function() {
        beforeEach(function(done) {
            spyOn(window, 'alert');
            loadFeed(10, done);
        });

        /* Ensure an error message is generated when content is requested from
         * inexistent feeds.
         */
        it('displays an error message', function() {
            expect(window.alert).toHaveBeenCalledWith("Error: The requested feed doesn't exist.");
        });
    });

    describe('Failed Feed request', function() {
        beforeEach(function(done) {
            jasmine.Ajax.install();
            spyOn(window, 'alert');
            loadFeed(0, done);
            var request = jasmine.Ajax.requests.mostRecent();
            request.respondWith({status: 503});
        });

        /* Ensure an error message is generated when AJAX fails.
         */
        it('displays an error message', function() {
            expect(window.alert).toHaveBeenCalledWith("Error: The content failed to load. Please check your Internet connection.");
        });

        afterEach(function() {
            jasmine.Ajax.uninstall();
        });
    });
}());
