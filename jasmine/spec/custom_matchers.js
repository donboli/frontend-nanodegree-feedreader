beforeEach(function() {
    jasmine.addMatchers({
        toHaveClass: function() {
            return {
                compare: function($actual, $expected) {
                    return {
                        pass: $actual.hasClass($expected)
                    };
                }
            };
        },
    });
});