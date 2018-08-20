function(doc) {
	if (doc.owned > $('#date1').val() && doc.owned < $('#date2').val()) {
    	emit(doc.owned, doc);
	}
};