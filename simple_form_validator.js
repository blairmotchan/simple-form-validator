(function () {
    jQuery(document).ready(function () {
        initiateErrorHandling();
    });

    function initiateErrorHandling() {
        var errorHandlingInitiated = "error-handling-initiated";
        jQuery("input.validate, select.validate, textarea.validate").each(function () {
            var node = jQuery(this);
            if (node.attr("type") != "checkbox") {
                if (!node.hasClass(errorHandlingInitiated)) {
                    node.addClass(errorHandlingInitiated)
                    node.blur(function () {
                        checkErrors(jQuery(node));
                    });
                }
            }
        });
        jQuery("form").each(function () {
            var node = jQuery(this);
            if (!node.hasClass(errorHandlingInitiated) && !node.hasClass('no-validate')) {
                node.addClass(errorHandlingInitiated);
                node.submit(function (event) {
                    errorCheckSubmit(event, node);
                });
            }
        });
    }

    function errorCheckSubmit(event, form, scrollTo) {
        jQuery("button", form).attr("disabled", "disabled");
        var hasErrors = false;
        jQuery("input.validate, select.validate, textarea.validate", form).each(function (index, input) {
            var error = checkErrors(jQuery(input));
            if (error) hasErrors = true;
        });

        if (hasCheckBoxErrors()) hasErrors = true;
        if (hasRadioErrors()) hasErrors = true;

        if (hasErrors) {
            if (event != null) event.preventDefault();
            jQuery("button", form).removeAttr("disabled");
            if (typeof scrollTo === "undefined" || scrollTo == true) {
                if (jQuery(".has-error").length > 0) {
                    jQuery.scrollTo(jQuery(".has-error").first(), 500, {offset: -100});
                }
            }
        }
    }


    function hasRadioErrors() {
        var errorFields = {};
        var hasErrors = false;

        jQuery("input.validate[type='radio']").each(function (i, inputNode) {
            var name = jQuery(inputNode).attr("name");
            var error = true;
            jQuery("input[name='" + name + "'][type='radio']").each(function (j, nameNode) {
                if (nameNode.checked == true) error = false;
            });
            if (error) {
                errorFields[name] = true;
                hasErrors = true;
                displayInputError(jQuery(inputNode));
            }
        });

        return hasErrors;
    }


    function hasCheckBoxErrors() {
        var errorFields = {};
        var hasErrors = false;
        jQuery("input.validate[type='checkbox']").each(function (i, inputNode) {
            var name = jQuery(inputNode).attr("name");
            var error = true;
            jQuery("input[name='" + name + "'][type='checkbox']").each(function (j, nameNode) {
                if (nameNode.checked == true) error = false;
            });
            if (error) {
                errorFields[name] = true;
                hasErrors = true;
                displayInputError(jQuery(inputNode));
            }
        });

        return hasErrors;
    }

    function checkErrors(input) {
        var hasErrors = false;
        var disabled = input.attr("disabled");
        if (typeof disabled === 'undefined' || disabled === false) {
            var value = input.val();
            if (input.attr("validate_required") && value == "") {
                displayInputError(input);
                hasErrors = true;
            }
            if (input.attr("validate_regex") && value != "") {
                var regex = new RegExp(input.attr("validate_regex"));
                if (!regex.test(value)) {
                    displayInputError(input);
                    hasErrors = true;
                }
            }
        }
        if (!hasErrors) {
            clearInputErrors(input);
        }
        return hasErrors;
    }

    function displayInputError(input) {
        var div = input.parents("div").first();
        div.addClass("form-group has-error");
        jQuery("label", div).addClass("control-label");
        input.attr("data-toggle", "tooltip");

        var errors = [];
        if (input.attr("validate_required")) errors[errors.length] = "Required";
        if (input.attr("validate_one_required")) errors[errors.length] = "At least one required";
        if (input.attr("validate_regex")) errors[errors.length] = "Does not match pattern " + input.attr("validate_pattern");
        input.attr("title", errors.join("<br />"))
        input.attr("data-html", "true");
        input.attr("error", "true");
        input.tooltip("show");
    }

    function clearInputErrors(input) {
        var div = input.parents("div").first();
        div.removeClass("form-group has-error");
        jQuery("label", div).first().removeClass("control-label");
        input.tooltip("destroy");
        input.attr("title", "");
        input.removeAttr("error");
        input.attr("data-toggle", "");
    }

})();
