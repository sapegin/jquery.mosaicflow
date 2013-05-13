/**
 * Mosaic Flow
 *
 * Pinterest like responsive image grid that doesn’t sucks
 *
 * @requires jQuery
 * @author Artem Sapegin
 * @copyright 2012 Artem Sapegin, http://sapegin.me
 * @license MIT
 */

/*jshint browser:true, jquery:true, white:false, smarttabs:true */
/*global jQuery:false, define:false*/
(function (factory) {  // Try to register as an anonymous AMD module
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		factory(jQuery);
	}
}(function ($) {
	'use strict';
	var cnt = 0;

	$.fn.mosaicflow = function(options) {
		var args = Array.prototype.slice.call(arguments,0);

		return this.each(function() {

			var elm = $(this),
				data = elm.data('mosaicflow');

			if (!data) {
				options = $.extend({}, $.fn.mosaicflow.defaults, options, dataToOptions(elm));
				elm.data('mosaicflow', (data = new Mosaicflow(elm,options)));
			}
			else if( typeof options==='string' ) {
				data[options](args[1]);
			}
		});
	};

	$.fn.mosaicflow.defaults = {
		itemSelector: '> *',
		columnClass: 'mosaicflow__column',
		minItemWidth: 240,
		itemHeightCalculation : 'auto'
	};

	function Mosaicflow(container, options) {
		this.container = container;
		this.options = options;

		this.init();
	}

	Mosaicflow.prototype = {
		init: function() {
			this.__uid          = cnt;
			this.__uid_item_counter = 0;
			this.items          = this.container.find(this.options.itemSelector);
			this.columns        = [];
			this.columnsHeights = [];
			this.itemsHeights   = {};
			this.tempContainer  = $('<div/>').css('visibility','hidden');
			this.workOnTemp     = false;
			$('body').append(this.tempContainer);

			var that = this;
			this.items.each(function(){
				var elm = $(this),
				    id = elm.attr('id');
				if (!id) {
					// Generate a unique id
					id = that.generateUniqueId();
					elm.attr('id', id);
				}
			});

			this.refill();
			$(window).resize($.proxy(this.refill, this));
		},

		refill: function() {
			this.numberOfColumns = Math.floor(this.container.width() / this.options.minItemWidth);
			var needToRefill = this.ensureColumns();
			if (needToRefill) {
				this.fillColumns();

				// Remove excess columns
				this.columns.filter(':hidden').remove();
			}
		},

		ensureColumns: function() {
			var createdCnt = this.columns.length,
				calculatedCnt = this.numberOfColumns;

			this.tempContainer.css('width',this.container.width()+'px');
			this.workingContainer = (createdCnt===0)? this.tempContainer:this.container;

			if (calculatedCnt > createdCnt) {
				var neededCnt = calculatedCnt - createdCnt;
				for (var columnIdx = 0; columnIdx < neededCnt; columnIdx++) {
					var column = $('<div>', {
						'class': this.options.columnClass
					});

					this.workingContainer.append(column);
				}
			}
			else if (calculatedCnt < createdCnt) {
				var lastColumn = createdCnt;
				while (calculatedCnt <= lastColumn) {
					// We can't remove columns here becase it will remove items to. So we hide it and will remove later.
					this.columns.eq(lastColumn).hide();
					lastColumn--;
				}

				var diff = createdCnt-calculatedCnt;
				this.columnsHeights.splice(this.columnsHeights.length - diff, diff);
			}

			if (calculatedCnt !== createdCnt) {

				this.columns = this.workingContainer.find('.' + this.options.columnClass);
				this.columns.width((100 / calculatedCnt) + '%');
				return true;
			}

			return false;
		},

		fillColumns: function() {
			var columnsCnt = this.numberOfColumns,
				itemsCnt = this.items.length;

			for (var columnIdx = 0; columnIdx < columnsCnt; columnIdx++) {
				var column = this.columns.eq(columnIdx);
				this.columnsHeights[columnIdx] = 0;
				for (var itemIdx = columnIdx; itemIdx < itemsCnt; itemIdx += columnsCnt) {
					var item = this.items.eq(itemIdx),
					height   = 0;
					column.append(item);

					if (this.options.itemHeightCalculation==='auto'){
						height = item.outerHeight();	// Check height after being placed in its column.
					}
					else {// read img height attribute 
						height = parseInt(item.find('img').attr('height'), 10);
					}

					this.itemsHeights[item.attr('id')] = height;
					this.columnsHeights[columnIdx] += height;
				}
			}

			this.levelBottomEdge(this.itemsHeights, this.columnsHeights);

			if (this.workingContainer===this.tempContainer) {
				this.container.append(this.tempContainer.children());
			}
			this.container.trigger('mosaicflow-layout');
		},

		levelBottomEdge: function(itemsHeights, columnsHeights) {
			while (true) {
				var lowestColumn = $.inArray(Math.min.apply(null, columnsHeights), columnsHeights),
					highestColumn = $.inArray(Math.max.apply(null, columnsHeights), columnsHeights);
				if (lowestColumn === highestColumn) return;

				var lastInHighestColumn = this.columns.eq(highestColumn).children().last(),
					lastInHighestColumnHeight = itemsHeights[lastInHighestColumn.attr('id')],
					lowestHeight = columnsHeights[lowestColumn],
					highestHeight = columnsHeights[highestColumn],
					newLowestHeight = lowestHeight + lastInHighestColumnHeight;

				if (newLowestHeight >= highestHeight) return;

				this.columns.eq(lowestColumn).append(lastInHighestColumn);
				columnsHeights[highestColumn] -= lastInHighestColumnHeight;
				columnsHeights[lowestColumn] += lastInHighestColumnHeight;
			}
		},

		add : function(elm) {
			var lowestColumn = $.inArray(Math.min.apply(null, this.columnsHeights), this.columnsHeights),
			height = 0;

			if (this.options.itemHeightCalculation==='auto') {
						// Get height of elm
				elm.css({
					position:   'absolute',
					visibility: 'hidden',
					display:    'block'
				}).appendTo('body');
				
				height = elm.outerHeight();
	
				elm.detach().css({
					position: 'static',
					visibility: 'visible'
				});
			}
			else {
				height = parseInt(elm.find('img').attr('height'), 10);
			}

			if (!elm.attr('id')) {
				// Generate a unique id
				elm.attr('id', this.generateUniqueId());
			}

			// Update item collection.
			// item needs to be placed at the end of this.items
			// to keep order of elements
			var arr = [];
			this.items.each(function(){
				arr.push(this);
			});
			arr.push(elm[0]);
			this.items = $(arr);

			this.itemsHeights[elm.attr('id')] = height;
			this.columnsHeights[lowestColumn]+= height;
			this.columns.eq(lowestColumn).append( elm );

			this.levelBottomEdge(this.itemsHeights, this.columnsHeights);
			this.container.trigger('mosaicflow-layout');
		},

		remove : function(elm) {
			var column = elm.parents('.' + this.options.columnClass);

			// Update column height
			var x = column.index();
			this.columnsHeights[x]-= this.itemsHeights[elm.attr('id')];

			elm.detach();

			// Update item collection
			this.items = this.items.not(elm);
			this.levelBottomEdge(this.itemsHeights, this.columnsHeights);
			this.container.trigger('mosaicflow-layout');
		},

		generateUniqueId : function() {
			// Increment the counter
			this.__uid_item_counter++;

			// Return a unique ID
			return 'mosaic-' + this.__uid + '-itemid-' + this.__uid_item_counter;
		}
	};

	// Camelize data-attributes
	function dataToOptions(elem) {
		function upper(m, l) {
			return l.toUpper();
		}
		var options = {};
		var data = elem.data();
		for (var key in data) {
			options[key.replace(/-(\w)/g, upper)] = data[key];
		}
		return options;
	}

	// Auto init
	$(function() { $('.mosaicflow').mosaicflow(); });

}));
