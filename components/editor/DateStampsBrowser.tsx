      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-rose-50 to-pink-50">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Date Stamps</h3>
            <p className="text-xs text-gray-500">{filteredStamps.length} stamp styles</p>
          </div>
        </div>

        {/* Date Picker */}
        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-500 mb-1">SELECT DATE</label>
          <input
            type="date"
            value={currentDate.toISOString().split('T')[0]}
            onChange={(e) => setCurrentDate(new Date(e.target.value))}
            className="w-full px-3 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search stamps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-2 border-b overflow-x-auto">
        <div className="flex gap-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-rose-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Stamps Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredStamps.map(stamp => (
            <button
              key={stamp.id}
              onClick={() => handleSelect(stamp)}
              className="w-full p-4 bg-white rounded-lg border hover:border-rose-300 hover:shadow-md transition-all text-left"
            >
              {/* Stamp Preview */}
              <div 
                className="mb-2 whitespace-pre-line"
                style={stamp.style}
              >
                {stamp.template(currentDate)}
              </div>
              
              {/* Stamp Name */}
              <p className="text-xs text-gray-500">{stamp.name}</p>
            </button>
          ))}
        </div>

        {filteredStamps.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No stamps found</p>
          </div>
        )}
      </div>
    </div>
  );
}
