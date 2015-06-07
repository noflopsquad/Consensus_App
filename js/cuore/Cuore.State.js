CUORE.State = CUORE.Class(null, {
    keys: undefined,
    map: undefined,

    init: function() {
        this.keys = [];
        this.map = {};
    },

    hasKey: function(key) {
        return this.keys.indexOf(key) != -1;
    },

    save: function(key, value) {
        if (key === undefined) return;
        if (value === undefined) return;
        this._save_in_page(key, value);
        this._save_local(key, value);
    },

    delete: function(key) {
        this._removeKey(key);
    },

    retrieve: function(key) {
        if (!this.hasKey(key)) return this._from_local(key);
        return this.map[key];
    },

    _addKey: function(key) {
        if (this.hasKey(key)) return;
        this.keys.push(key);
    },

    _removeKey: function(key) {
        this.keys.splice(this.keys.indexOf(key), 1);
    },

    _save_in_page: function(key, value) {
        this._addKey(key);
        this.map[key] = value;
    },

    _save_local: function(key, value) {
        window.localStorage.setItem(key, value);
    },

    _from_local: function(key) {
        var fromLocal = window.localStorage.getItem(key);
        if (fromLocal != undefined) {
            this._save_in_page(key, fromLocal);
        }
        return fromLocal;
    }
});