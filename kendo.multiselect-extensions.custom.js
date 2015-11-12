;
(function ($, kendo) {
	var _tagTemplateBase = kendo.ui.MultiSelect.fn._tagTemplate
		, _normalizeOptionsBase = kendo.ui.MultiSelect.fn._normalizeOptions
		, _selectBase = kendo.ui.MultiSelect.fn._select
		, _listBoundBase = kendo.ui.MultiSelect.fn._listBound
		, initBase = kendo.ui.MultiSelect.fn.init;
	var MultiSelect = kendo.ui.MultiSelect.extend({
    	withCheckBoxes: false,
    	checkBoxIdData: 'data',
    	clearAllSelectedButtoon: '',
    	clearAllSelected: function () { },
    	init: function (element, options) {
	        var self = this;
    		if (options.withCheckBoxes) {
    		    options.tagMode = 'single';
    		    if (options.clearAllSelectedButtoon) {
    		        $(document).on('click', options.clearAllSelectedButtoon, function (ev, data) {
    		            options.clearAllSelected.call(self, ev, data);
    		        });
		        }
		    }
    		initBase.call(this, element, options);
	    },
	    _tagTemplate: function () {
	        if (!this.options.withCheckBoxes) {
	            _tagTemplateBase.call(this);
	        } else {
	        	var that = this;
	        	var options = that.options;
	        	var tagTemplate = options.tagTemplate;
	        	var hasDataSource = options.dataSource;
	        	var defaultTemplate;

	        	if (that.element[0].length && !hasDataSource) {
	        		options.dataTextField = options.dataTextField || "text";
	        		options.dataValueField = options.dataValueField || "value";
	        	}

	        	defaultTemplate = kendo.template("#:values.length# item(s) selected");

	        	that.tagTextTemplate = tagTemplate = tagTemplate ? kendo.template(tagTemplate) : defaultTemplate;

	        	that.tagTemplate = function (data) {
	        		return	'<li>' + tagTemplate(data) + '</li>';
	        	};
	        } 
    	},
    	_normalizeOptions: function (options) {
    		_normalizeOptionsBase.call(this, options);
    		if (this.options.withCheckBoxes) {
    			options.template = '<span><input type="checkbox" id="#:' + (this.options.checkBoxIdData || this.checkBoxIdData) + ' #" style="position: relative"><span style="position: absolute; margin-left:-20px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + options.template + '</span></span>';
		    } 
    	},
    	_select: function (candidate) {
    		if (this.options.withCheckBoxes) {
		        var checkBox = candidate.find('input[type="checkbox"]');
		        checkBox.prop('checked', !checkBox.prop('checked'));
		    }
    		_selectBase.call(this, candidate);
	    },
    	_listBound: function (e) {
    		if (this.options.withCheckBoxes) {
    			var list = this.list
    				, values = this.value();
    			$.each(values, function (i, el) {
    				if (el) {
    					list.find('input[type=checkbox]#' + el).prop('checked', true);
    				}
    			});
    		}
    		_listBoundBase.call(this, e);
	    }
    });
	kendo.ui.plugin(MultiSelect);
}(window.kendo.jQuery, window.kendo));