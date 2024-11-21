$(document).ready(function () {
    // التعامل مع زر "إظهار التفاصيل"
    $(".toggle-details").on("click", function () {
        const detailsRow = $(this).closest("tr").next(".details");

        if (detailsRow.hasClass("hidden")) {
            detailsRow.removeClass("hidden"); // إظهار التفاصيل
            $(this).text("إخفاء التفاصيل"); // تغيير نص الزر
        } else {
            detailsRow.addClass("hidden"); // إخفاء التفاصيل
            $(this).text("إظهار التفاصيل"); // إعادة النص الأصلي
        }
    });

    // التعامل مع زر "متابعة"
    $("#confirmBookButton").on("click", function () {
        const selectedBook = $("input[name='book']:checked");
        if (!selectedBook.length) {
            alert("يرجى اختيار كتاب قبل المتابعة.");
            return;
        }

        // إظهار النموذج وإظهار اسم الكتاب المختار
        $("#orderFormContainer").removeClass("hidden");
        $("#selectedBook").text(`الكتاب المختار: ${selectedBook.data("title")}`);
    });

    // التعامل مع إرسال النموذج
    $("#orderForm").on("submit", function (e) {
        e.preventDefault();

        // جمع البيانات المدخلة
        const fullName = $("#fullName").val().trim();
        const idNumber = $("#idNumber").val().trim();
        const birthDate = $("#birthDate").val().trim();
        const phoneNumber = $("#phoneNumber").val().trim();
        const email = $("#email").val().trim();
        const selectedBook = $("input[name='book']:checked").data("title");

        // التحقق من صحة المدخلات

// التحقق من الرقم الوطني (إلزامي)
if (!idNumber || !/^\d{11}$/.test(idNumber)) {
    alert("يرجى إدخال الرقم الوطني بشكل صحيح (11 رقماً).");
    return;
}

// التحقق من الاسم الكامل (اختياري)
if (fullName && !/^[\u0621-\u064A\s]+$/.test(fullName)) {
    alert("يرجى إدخال الاسم الكامل باللغة العربية فقط.");
    return;
}

// التحقق من تاريخ الميلاد (اختياري)
if (birthDate && !/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
    alert("يرجى إدخال تاريخ الميلاد بتنسيق صحيح (YYYY-MM-DD).");
    return;
}

// التحقق من رقم الموبايل (اختياري)
if (phoneNumber && !/^09[123456789]\d{7}$/.test(phoneNumber)) {
    alert("يرجى إدخال رقم موبايل صحيح يبدأ بـ 09.");
    return;
}

// التحقق من البريد الإلكتروني (اختياري)
if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    alert("يرجى إدخال بريد إلكتروني صحيح.");
    return;
}


        alert(
            `تم إرسال طلبك بنجاح!\n\n` +
            `الكتاب المختار: ${selectedBook}\n` +
            `الاسم الكامل: ${fullName}\n` +
            `الرقم الوطني: ${idNumber}\n` +
            `تاريخ الميلاد: ${birthDate}\n` +
            `رقم الموبايل: ${phoneNumber}\n` +
            `البريد الإلكتروني: ${email}`
        );
        // إعادة تعيين النموذج
        $("#orderForm")[0].reset();
        $("#orderFormContainer").addClass("hidden");
    });
});
