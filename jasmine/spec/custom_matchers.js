beforeEach(function() {
    jasmine.addMatchers({
        toHaveClass: function() {
            return {
                compare: function(actual, expected) {
                    return {
                        pass: actual.getAttribute("class").split(" ").indexOf(expected) !== -1
                    };
                }
            };
        },
    });
});