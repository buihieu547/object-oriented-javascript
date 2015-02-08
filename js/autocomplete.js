function Autocomplete(selector, items) {
  _.bindAll.apply(this, [this].concat(_.functions(this)));
  this.setupInput(selector);
  this.$el = this.$input.parent();
  this.createFilterInput();
  this.createCompletionList();
  this.createListItems(items);
  this.registerEvents();
}

Autocomplete.COMMAND_KEYCODES = {
  up: 38,
  down: 40,
  escape: 27,
  enter: 13
};

Autocomplete.COMMAND_KEYCODES = _.merge(Autocomplete.COMMAND_KEYCODES, _.invert(Autocomplete.COMMAND_KEYCODES));

Autocomplete.prototype.filterInputTemplate = _.template("<input name='<%= name %>' class='autocomplete-filter-input' value='<%= value %>' />");

Autocomplete.prototype.setupInput = function(selector) {
  this.$input = $(selector);
  this.$input.addClass("autocomplete-input");
  this.$input.wrap("<div class='autocomplete-container' />");
  this.$input.hide();
};

Autocomplete.prototype.createFilterInput = function() {
  this.$el.append(this.filterInputTemplate({
    name: this.$input.attr("name") + "_filter_input",
    value: this.$input.val()
  }));
  this.$autocompleteInput = this.$el.find(".autocomplete-filter-input");
};

Autocomplete.prototype.createCompletionList = function() {
  this.$el.append("<ul class='autocomplete-list'/>");
  this.$completionList = this.$el.find(".autocomplete-list");
};

Autocomplete.prototype.createListItem = function(item) {
  return new AutocompleteListItem(item, { onClick: this.handleItemClick });
};

Autocomplete.prototype.createListItems = function(items) {
  this.items = _.map(items, this.createListItem);
};

Autocomplete.prototype.registerEvents = function() {
  this.$autocompleteInput.on("keyup", this.handleInputKeyup);
};

Autocomplete.prototype.renderItem = function(item) {
  this.$completionList.append(item.$el);
};

Autocomplete.prototype.render = function() {
  this.$completionList.empty();
  this.$completionList.show();
  _.each(this.filteredItems(), this.renderItem);
};

Autocomplete.prototype.setFilter = function() {
  this.filter = this.$autocompleteInput.val() ? new RegExp("^" + this.$autocompleteInput.val(), "i") : null;
};

Autocomplete.prototype.handleTextEntry = function() {
  this.setFilter();
  this.render();
};

Autocomplete.prototype.handleInputKeyup = function(evnt) {
  if (_.contains(Autocomplete.COMMAND_KEYCODES, evnt.keyCode)) {
    this.handleCommand(evnt.keyCode);
  } else {
    this.handleTextEntry();
  }
};

Autocomplete.prototype.handleCommand = function(keyCode) {
  this["handle" + _.capitalize(Autocomplete.COMMAND_KEYCODES[keyCode])]();
};

Autocomplete.prototype.handleUp = function() {

};

Autocomplete.prototype.handleDown = function() {

};

Autocomplete.prototype.handleEnter = function() {

};

Autocomplete.prototype.handleEscape = function() {

};

Autocomplete.prototype.handleItemClick = function(item) {
  this.$input.val(item.text);
  this.$completionList.hide();
};

Autocomplete.prototype.itemMatchesFilter = function(item) {
  return this.filter ? !!item.text.match(this.filter) : false;
};

Autocomplete.prototype.filteredItems = function() {
  return this.filter ? _.filter(this.items, this.itemMatchesFilter) : [];
};