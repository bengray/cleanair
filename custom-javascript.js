jQuery(document).ready(function ($) {
  var sPageURL = window.location.search.substring(1);

  var is_product_page = false,
    is_category_page = false,
    is_blog_category_page = false,
    is_store_page = false,
    is_custom_service_page = false,
    is_testo300_page = false,
    is_cooling_tower_testing_page = false,
    is_cart_page = false,
    is_checkout_page = false,
    is_favorites_page = false,
    is_add_po_product_page = false,
    is_proposal_page = false;

  switch (window.location.pathname.split("/")[1]) {
    case "product":
      is_product_page = true;
      if (window.location.pathname.split("/")[2] == "testo-300") {
        is_testo300_page = true;
      }
      if (
        window.location.pathname.split("/")[2] ==
        "aeroqual-aqm-65-compact-air-quality-monitoring-station"
      ) {
        is_add_po_product_page = true;
      }
      if (
        window.location.pathname.split("/")[2] == "aeroqual-dust-gas-sentry"
      ) {
        is_add_po_product_page = true;
      }
      break;

    case "product-category":
      is_category_page = true;
      break;

    case "category":
      is_blog_category_page = true;
      break;

    case "store":
      is_store_page = true;
      break;

    case "shop":
      is_store_page = true;
      break;

    case "cooling-tower-testing":
      is_cooling_tower_testing_page = true;
      break;

    case "favorites":
      is_favorites_page = true;
      break;

    case "proposal":
      is_proposal_page = true;
      break;

    case "cart":
      is_cart_page = true;
      break;

    case "checkout":
      is_checkout_page = true;
      break;

    default:
      break;
  }

  if ($(".service_tab_header").length != 0) {
    is_custom_service_page = true;
  }

  if (is_checkout_page) {
    $(document).on("change", "#payment .wc_payment_methods", function () {
      if (
        $("input[name='payment_method']:checked").val() ==
        "gazchap_wc_purchaseordergateway"
      ) {
        $("#place_order").text("Get P.O.");
      } else if ($("input[name='payment_method']:checked").val() == "paypal") {
        $("#place_order").text("Proceed to PayPal");
      } else {
        $("#place_order").text("Place order");
      }
    });

  }

  if (is_blog_category_page) {
    switch (window.location.pathname.split("/")[2]) {
      case "news":
        $(".blog-category-news").addClass("active-highlight");
        break;

      case "education":
        $(".blog-category-education").addClass("active-highlight");
        break;

      case "guide":
        $(".blog-category-guide").addClass("active-highlight");
        break;

      case "media":
        $(".blog-category-media").addClass("active-highlight");
        break;

      case "analysis":
        $(".blog-category-analysis").addClass("active-highlight");
        break;

      case "event":
        $(".blog-category-event").addClass("active-highlight");
        break;

      default:
        break;
    }
  }

  if (is_cooling_tower_testing_page) {
    $(".anchor_links_container .grid-item:first-child").click(function () {
      $("html, body").animate(
        {
          scrollTop: $("#thermal_performance_testing").offset().top - 70,
        },
        500
      );
    });
    $(".anchor_links_container .grid-item:nth-child(2)").click(function () {
      $("html, body").animate(
        {
          scrollTop: $("#drift_emissions_testing").offset().top - 70,
        },
        500
      );
    });
    $(".anchor_links_container .grid-item:nth-child(3)").click(function () {
      $("html, body").animate(
        {
          scrollTop: $("#sound_testing").offset().top - 70,
        },
        500
      );
    });
    $(".anchor_links_container .grid-item:nth-child(4)").click(function () {
      $("html, body").animate(
        {
          scrollTop: $("#thermal_certification").offset().top - 70,
        },
        500
      );
    });
    $(".anchor_links_container .grid-item:nth-child(5)").click(function () {
      $("html, body").animate(
        {
          scrollTop: $("#plume_abatement_testing").offset().top - 70,
        },
        500
      );
    });
  }

  if (is_favorites_page) {
    $(".woosw-content-items .product-action a").each((index, element) => {
      $(element).text("VIEW PRODUCT");
      $(element).attr(
        "href",
        $(element)
          .parents("td")
          .prev()
          .find(".woosw-content-item--title")
          .find("a")
          .attr("href")
      );
    });
  }

  /**
   * Compare action buttons
   */
  $(document).on("DOMSubtreeModified", "#wooscp-area .wooscp-bar", function () {
    setTimeout(() => {
      $("#wooscp_table .product-action a").each((index, element) => {
        $(element).text("View Product");
        console.log(index);
        console.log(
          $(element)
            .parents("table")
            .find("thead")
            .find("th:nth-child(" + (index + 2) + ")")
            .find("a")
            .attr("href")
        );
        $(element).attr(
          "href",
          $(element)
            .parents("td")
            .prev()
            .find(".woosw-content-item--title")
            .find("a")
            .attr("href")
        );
      });
      $("#wooscp_table .product-action a").addClass("loaded");
    }, 3000);
  });

  /*
   * Spec Sheet
   */
  if (is_product_page) {
    // Swap tab postion
    $("#tab-title-spec-sheet").insertAfter("#tab-title-additional_information");
    $("#tab-title-videos").insertAfter("#tab-title-spec-sheet");
    $("#tab-title-spec-sheet").removeClass("active");
    $("#tab-title-description").addClass("active");
    $("#tab-spec-sheet").hide();
    $("#tab-description").show();

    // Load spec sheet
    function filesCheck(url) {
      return fetch(url).then(function (response) {
        return response.status;
      });
    }

    const specCheck = filesCheck(
      "/wp-content/uploads/spec-sheets/Spec-Sheets/" +
        $(".product_title").text() +
        ".pdf"
    );
    const brochureCheck = filesCheck(
      "/wp-content/uploads/spec-sheets/Brochures/" +
        $(".product_title").text() +
        ".pdf"
    );
    const manualCheck = filesCheck(
      "/wp-content/uploads/spec-sheets/Manuals/" +
        $(".product_title").text() +
        ".pdf"
    );
    const diagramCheck = filesCheck(
      "/wp-content/uploads/spec-sheets/Diagrams/" +
        $(".product_title").text() +
        ".pdf"
    );

    specCheck.then(function (result) {
      if (result == 200) {
        $(".woocommerce-Tabs-panel--spec-sheet .no-spec-sheet").remove();
        $(".woocommerce-Tabs-panel--spec-sheet").prepend(
          "<p class='spec-sheet'><a href='#' target='_blank'></a></p>"
        );

        $(".spec-sheet a").attr(
          "href",
          "/wp-content/uploads/spec-sheets/Spec-Sheets/" +
            encodeURIComponent($.trim($(".product_title").text())) +
            ".pdf"
        );
        $(".spec-sheet a").text("Spec Sheet for " + $(".product_title").text());
      }
    });

    brochureCheck.then(function (result) {
      if (result == 200) {
        $(".woocommerce-Tabs-panel--spec-sheet .no-spec-sheet").remove();
        $(".woocommerce-Tabs-panel--spec-sheet").empty();
        $(".woocommerce-Tabs-panel--spec-sheet").prepend(
          "<p class='borchure'><a href='#' target='_blank'></a></p>"
        );

        $(".borchure a").attr(
          "href",
          "/wp-content/uploads/spec-sheets/Brochures/" +
            encodeURIComponent($.trim($(".product_title").text())) +
            ".pdf"
        );
        $(".borchure a").text("Brochure for " + $(".product_title").text());
      }
    });

    manualCheck.then(function (result) {
      if (result == 200) {
        $(".woocommerce-Tabs-panel--spec-sheet .no-spec-sheet").remove();
        $(".woocommerce-Tabs-panel--spec-sheet").prepend(
          "<p class='manual'><a href='#' target='_blank'></a></p>"
        );

        $(".manual a").attr(
          "href",
          "/wp-content/uploads/spec-sheets/Manuals/" +
            encodeURIComponent($.trim($(".product_title").text())) +
            ".pdf"
        );
        $(".manual a").text("Manual for " + $(".product_title").text());
      }
    });

    diagramCheck.then(function (result) {
      if (result == 200) {
        $(".woocommerce-Tabs-panel--spec-sheet .no-spec-sheet").remove();
        $(".woocommerce-Tabs-panel--spec-sheet").prepend(
          "<p class='diagram'><a href='#' target='_blank'></a></p>"
        );

        $(".diagram a").attr(
          "href",
          "/wp-content/uploads/spec-sheets/Diagrams/" +
            encodeURIComponent($.trim($(".product_title").text())) +
            ".pdf"
        );
        $(".diagram a").text("Diagram for " + $(".product_title").text());
      }
    });

    // Add the Rent Database Link below the title

    $(
      "<p><a href='https://www.cleanair.com/store/pop-search/' target='_blank'>Asset Certification Sheets</a></p>"
    ).insertAfter(".woo-single-summary .product_title:contains('Analyzer')");

    if ($(".posted_in.meta-item a:nth-child(2)").text() == "Combustion Gas") {
      $(
        "<p><a href='https://www.cleanair.com/store/coa-search/' target='_blank'>Gas Cylinder Database</a></p>"
      ).insertAfter(".woo-single-summary .product_title");
    }

    // Call us and Compare button
    // ----------- Want to make 3 different Call Us Buttons that activate either as General, Beyond, or Purchase Options. They should auto-trigger with tag. -------------
/**    $(
      '<div class="additional-btns"><div class="call-us-button"><a href="tel:+1-800-553-5511"><i class="fas fa-phone link-icon"></i></a></div></div>'
    ).insertBefore(".product-meta-wrap");
*/

    // $("a.wooscp-btn").insertAfter(".call-us-button");

    $(
      ".product-actions .product-action.proposal-btn.hint--primary.hint--top"
    ).insertAfter(".call-us-button");
    $(
      ".product-actions .product-action.compare-btn.hint--primary.hint--top"
    ).insertAfter(".call-us-button");

    // Quote button text
    $(".dvin_wcql_btn_wrap button").text("Rental Quote");

    // Remove add to cart button on the Rental only products
    if ($(".meta-item a:contains('rental-only')").length != 0) {
      $(".single_add_to_cart_button").hide();
      $(".quantity-button-wrapper").hide();

      setTimeout(() => {
        $(".dvin_wcql_btn_wrap button").removeClass("disabled");
      }, 500);

      $(".add-request-quote-button").hide();
    }

if ($(".meta-item a:contains('dont-sell')").length != 0) {
$(".single_add_to_cart_button").addClass("hide");
$(".woo-single-summary .price").addClass("hide");
$(".woocommerce-variation-price").addClass("hide");


// JM added 2/1/2024 ---> // JM added 12/1/2023 --->
	$(".woocommerce-variation-price > .price").addClass("hide");
    }

// JM added 12/18/2023 --->  .product_type_variable .enabled
if ($(".meta-item a:contains('es')").length == 0 &&
    $(".meta-item a:contains('buy-only')").length == 0
    ) {
	$(".button .alt .addquotelistbutton_prodpage .product_type_variable .enabled").removeClass("enabled");
    }

    // Rental product options
    if (
      $(".meta-item a:contains('rental-only')").length == 0 &&
      $(".meta-item a:contains('buy-or-rent')").length == 0
    ) {
      $(".wc-pao-addon-request-date").remove();
      $(".wc-pao-addon-return-date").remove();
      $(".addquotelistlink").remove();
    } else {
      $(".wc-pao-addon-request-date input.wc-pao-addon-field").attr(
        "type",
        "date"
      );
      $(".wc-pao-addon-return-date input.wc-pao-addon-field").attr(
        "type",
        "date"
      );
    }

    $(".add-request-quote-button").insertAfter($(".single_add_to_cart_button"));

    var waitforAddProposal = setInterval(() => {
      if ($(".product-actions.addedd").length != 0) {
        window.location.href = "/proposal";
        clearInterval(waitforAddProposal);
      }
    }, 1000);

    if ($(".meta-item a:contains('buy-or-rent')").length != 0) {
      // Buy or Rent changes
      $(".variations select").change(function () {
        if ($("#pa_buy-or-rent").val() == "buy") {
          $(".wc-pao-addon-request-date").hide();
          $(".wc-pao-addon-return-date").hide();

          $(".single_add_to_cart_button ").show();
          $(".add-request-quote-button").show();

          $(".dvin_wcql_btn_wrap").hide();
        } else {
          $(".wc-pao-addon-request-date").show();
          $(".wc-pao-addon-return-date").show();

          $(".single_add_to_cart_button ").hide();
          $(".add-request-quote-button").hide();

          $(".dvin_wcql_btn_wrap").show();
        }
      });
    }

    if ($(".meta-item a:contains('call-for-po')").length != 0) {
      $(
        "<div class='additional-btns'><div class='call-us-button'><a href='tel:+1-847-654-4680'><i class='fas fa-phone link-icon'></i></a></div></div><div class='call_for_po'><p>Call <a href='tel:+1-847-654-4680'>847-654-4680</a> for Purchase Options</p></div>"
      ).insertBefore(".product-meta-wrap");
    } else if ($(".meta-item a:contains('beyond-product')").length != 0) {
      $(
        "<div class='additional-btns'><div class='call-us-button'><a href='tel:+1-888-212-0890'><i class='fas fa-phone link-icon'></i></a></div></div><div class='call_for_po'><p>Call <a href='tel:+1-888-212-0890'>888-212-0890</a> for Inquiries</p></div>"
      ).insertBefore(".product-meta-wrap");
    } else {
      $(
        "<div class='additional-btns'><div class='call-us-button'><a href='tel:+1-800-553-5511'><i class='fas fa-phone link-icon'></i></a></div></div><div class='call_for_po'><p> Questions? Call us at <a href='tel:+1-800-553-5511'>800-553-5511</a></p></div>"
      ).insertBefore(".product-meta-wrap");
    }
  }
  /* ******************************************* */

  /*
   * Mini Cart
   */
  $(".woocommerce-mini-cart__empty-message .wc-backward").attr(
    "href",
    "/store/"
  );

  $(".woocommerce-mini-cart__empty-message .wc-backward").text(
    "Visit CleanAir Store"
  );

  /*
   * proposal
   */
  $("#proposal-link .proposal-icon").attr(
    "data-count",
    $(".woosw-count").text()
  );

  var waitproposal = setInterval(() => {
    if (
      $("#woosw-area .woosw-content-mid .woosw-content-item--title").length != 0
    ) {
      $("#woosw-area .product-action a").each((index, element) => {
        $(element).text("VIEW PRODUCT");
        $(element).attr(
          "href",
          $(element)
            .parents("td")
            .prev()
            .find(".woosw-content-item--title")
            .find("a")
            .attr("href")
        );
      });

      clearInterval(waitproposal);
    }
  }, 1000);

  $(document).on("DOMSubtreeModified", "#woosw-area", function () {
    $("#proposal-link .proposal-icon").attr(
      "data-count",
      $(".woosw-count").text()
    );
  });

  // Product page SKU and Price changing.
  $(document).on(
    "DOMSubtreeModified",
    ".single_variation_wrap .woocommerce-variation",
    function () {
      setTimeout(() => {
        if ($(".woocommerce-variation-sku").text() != "") {
          $(".product-meta-wrap .sku").text(
            $(".woocommerce-variation-sku").text()
          );
        }

        if ($(".woocommerce-variation-price .amount").text() != "") {
          $(".woo-single-summary .price").html(
            $(".woocommerce-variation-price .amount").text()
          );
        }
      }, 500);
    }
  );

  // Clear Add-on selection when the variation changes
  $(".variations .value").change(function () {
    $(".wc-pao-addon-select").val("");
  });

  // Product Page SKU and Price changing when add-on changes
  $(".wc-pao-addon-select").change(function () {
    setTimeout(() => {
      if ($("#product-addons-total .price").length != 0) {
        $(".woo-single-summary .price").html(
          $("#product-addons-total .wc-pao-subtotal-line .amount").text()
        );
      }
    }, 500);
  });

  /*
   * Breadcrumbs
   */
  if (is_category_page) {
    $(
      '<li class="level-1 top"><a href="/store/">Store Home</a></li>'
    ).insertAfter(".insight_core_breadcrumb > li:first-child");
  }

  /*
   * Footer Subscription Display
   */
  if (is_category_page || is_product_page || is_store_page) {
    $("#footer-subscription").css("display", "-webkit-box");
    $("#footer-contact").hide();
  }

  if (!is_checkout_page && !is_proposal_page) {
    $(".woocommerce-Price-amount").each((index, ele) => {
      if ($(ele).text() == "$0.00") {
        $(ele).html("Request Quote");
      }
    });
  }

  if (is_proposal_page) {
    setInterval(() => {
      $(".woocommerce-Price-amount.amount").each((index, ele) => {
        if ($(ele).text() == "$0.00") {
          $(ele).text("Call for Quote");
        }
      });
    }, 100);
  }

  /*
   * Service Tab switcher for Custom service pages.
   */
  if (is_custom_service_page) {
    setTimeout(() => {
      $(".service_tab_header .grid-item:first-child").addClass("active");
      $(".service_tab_content_top").eq(0).addClass("active");
      $(".service_tab_content_bottom").eq(0).addClass("active");

      $(".service_tab_header .grid-item").click(function () {
        $(".service_tab_header .grid-item").removeClass("active");
        $(".service_tab_content_top").removeClass("active");
        $(".service_tab_content_bottom").removeClass("active");

        $(this).addClass("active");

        var index = $(this).index();
        $(".service_tab_content_top").eq(index).addClass("active");
        $(".service_tab_content_bottom").eq(index).addClass("active");
      });
    }, 1000);
  }

  /*
   * Favorites Page
   */
  $(".woosw-content-mid-notice").html(
    "<p>You haven’t saved any items to your favorites! Try browsing our catalog.</p>"
  );
  $("<button class='woosw-no-item-btn'>Browse Shop</button>").insertAfter(
    ".woosw-content-mid-notice p"
  );

  /*
   * Search popup top position
   */
  $("#page-popup-search").insertAfter("#page-header-inner");

  if (is_category_page) {
    /**
     * Category Page product display option and
     */
    /**
     * Category Page Filter by Rent vs Purchase
     */

    if (sPageURL != "") {
      var sURLVariables = sPageURL.split("&");
      for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split("=");
        if (sParameterName[0] === "display") {
          sParameterValue =
            sParameterName[1] === undefined
              ? true
              : decodeURIComponent(sParameterName[1]);

          $("select.display option[value='" + sParameterValue + "']").attr(
            "selected",
            "selected"
          );
        }

        if (sParameterName[0] === "product_tag_0") {
          sParameterValue =
            sParameterName[1] === undefined
              ? true
              : decodeURIComponent(sParameterName[1]);

          $(".product-tag-filter-form input#" + sParameterValue)
            .parent()
            .addClass("active");
          $(".product-tag-filter-form input#" + sParameterValue).attr(
            "checked",
            "checked"
          );
        }
      }
    }

    if ($(".product-tag-filter-form label.active").length == 0) {
      $(".product-tag-filter-form input#all").parent().addClass("active");
    }

    $("form.woocommerce-display").change(function () {
      if (
        $("form.woocommerce-ordering select.orderby option:selected").val() !=
        undefined
      ) {
        $("form.woocommerce-display input.orderby").val(
          $("form.woocommerce-ordering select.orderby option:selected").val()
        );
      } else {
        $("form.woocommerce-display input.orderby").remove();
      }

      if (
        $("form.product-tag-filter-form label.active input").val() !=
          undefined &&
        $("form.product-tag-filter-form label.active input").val() != "all"
      ) {
        $("form.woocommerce-display input.product_tag_0").val(
          $("form.product-tag-filter-form label.active input").val()
        );
      } else {
        $("form.woocommerce-display input.product_tag_0").remove();
      }

      $(this).submit();
    });

    $("form.product-tag-filter-form").change(function () {
      let category = "",
        tag = "",
        orderby = "",
        display = "";

      tag = $("input.product-tag-filter:checked").val();

      if ($("input.product-tag-filter:checked").val() === "all") {
        $(".product-tag-filter-form input").removeAttr("checked");
        $("form.product-tag-filter-form").trigger("reset");
      }

      if (
        $("form.woocommerce-ordering select.orderby option:selected").val() !=
        undefined
      ) {
        orderby = $(
          "form.woocommerce-ordering select.orderby option:selected"
        ).val();
        $("form.product-tag-filter-form input.orderby").val(
          $("form.woocommerce-ordering select.orderby option:selected").val()
        );
      } else {
        $("form.product-tag-filter-form input.orderby").remove();
      }

      if (
        $("form.woocommerce-display select.display option:selected").val() !=
        undefined
      ) {
        display = $(
          "form.woocommerce-display select.display option:selected"
        ).val();
        $("form.product-tag-filter-form input.display").val(
          $("form.woocommerce-display select.display option:selected").val()
        );
      } else {
        $("form.product-tag-filter-form input.display").remove();
      }

      category = window.location.href.split("/")[4];

      let url = "https://www.cleanair.com/product-category/" + category + "/?";

      if (tag != "" && tag != "all") url = url + "product_tag_0=" + tag + "&";
      if (orderby != "") url = url + "orderby=" + orderby + "&";
      if (display != "") url = url + "display=" + display;

      window.location.href = url;
    });
  }

  /**
   * Mega Menu
   */
  $(".mm_store_home_ico .icon").mouseenter(function () {
    $(this).parent().parent().addClass("hover");
  });

  $(".mm_store_home_ico .icon").mouseleave(function () {
    $(this).parent().parent().removeClass("hover");
  });

  $(".mm_store_home_ico .icon").click(function () {
    window.location.replace("https://www.cleanair.com/store/");
  });

  $(".mm_store_home_txt").mouseenter(function () {
    $(this).parent().addClass("hover");
  });

  $(".mm_store_home_txt").mouseleave(function () {
    $(this).parent().removeClass("hover");
  });

  /**
   * Proposal Page
   */
  if (is_proposal_page) {
    var content_items = $("#yith-ywrq-table-list .cart_item"),
      proposal_list = $(".proposal-list-container tbody tr"),
      proposal_list_html = $(".proposal-list-container tbody").html();

    $(".proposal-list-container tbody").empty();
    $(".proposal-list-container tbody").html(proposal_list_html);
    for (let i = 0; i < content_items.length - proposal_list.length; i++) {
      $(proposal_list_html).insertAfter(
        $(
          ".proposal-list-container .gfield_list_container tbody > tr:last-child"
        )
      );
    }

    $.each(
      $("#yith-ywrq-table-list .cart_item .product-name"),
      function (index, value) {
        $(
          ".proposal-list-container .gfield_list_container tbody > tr:nth-child(" +
            (index + 1) +
            ") input[aria-label='Product Name']"
        ).val($(this).find("a").text());

        $(
          ".proposal-list-container .gfield_list_container tbody > tr:nth-child(" +
            (index + 1) +
            ") input[aria-label='Product Link']"
        ).val($(this).find("a").attr("href"));

        $(
          ".proposal-list-container .gfield_list_container tbody > tr:nth-child(" +
            (index + 1) +
            ") input[aria-label='Product Options']"
        ).val($.trim($(this).text().split($(this).find("a").text())[1]));

        $(
          ".proposal-list-container .gfield_list_container tbody > tr:nth-child(" +
            (index + 1) +
            ") input[aria-label='Quantity']"
        ).val($(this).next().find("input.qty").val());

        if ($(this).next().next().find(".amount").text() == "$0.00") {
          $(
            ".proposal-list-container .gfield_list_container tbody > tr:nth-child(" +
              (index + 1) +
              ") input[aria-label='Product Price']"
          ).val("Call for Quote");
        } else {
          $(
            ".proposal-list-container .gfield_list_container tbody > tr:nth-child(" +
              (index + 1) +
              ") input[aria-label='Product Price']"
          ).val($(this).next().next().find(".amount").text());
        }
      }
    );
  }

  /**
   * Search Form Reconfiguration
   */
  if (sPageURL != "") {
    var sURLVariables = sPageURL.split("&");
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split("=");
      if (sParameterName[0] === "s") {
        sParameterValue =
          sParameterName[1] === undefined
            ? true
            : decodeURIComponent(sParameterName[1]);

        console.log(sParameterValue);

        $(".header-search-form-wrap input.search-field").val(sParameterValue);
        $("body.search .page-title-bar-heading .heading").text(
          'Search results for: "' + sParameterValue + '"'
        );
      }
    }
  }
});


