module.exports = (data) => `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Registration at Pips-Pro.com</title>
        <style>
          /* -------------------------------------
              GLOBAL RESETS
          ------------------------------------- */
          img {
            border: none;
            -ms-interpolation-mode: bicubic;
            max-width: 100%; }

          body {
            background-color: #f6f6f6;
            font-family: sans-serif;
            -webkit-font-smoothing: antialiased;
            font-size: 14px;
            line-height: 1.4;
            margin: 0;
            padding: 0; 
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%; }

          table {
            border-collapse: separate;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            width: 100%; }
            table td {
              font-family: sans-serif;
              font-size: 14px;
              vertical-align: top; }

          /* -------------------------------------
              BODY & CONTAINER
          ------------------------------------- */

          .body {
            background-color: #f6f6f6;
            width: 100%; }

          /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
          .container {
            display: block;
            Margin: 0 auto !important;
            /* makes it centered */
            max-width: 580px;
            padding: 10px;
            width: 580px; }

          /* This should also be a block element, so that it will fill 100% of the .container */
          .content {
            box-sizing: border-box;
            display: block;
            Margin: 0 auto;
            max-width: 580px;
            padding: 10px; }

          /* -------------------------------------
              HEADER, FOOTER, MAIN
          ------------------------------------- */
          .main {
            background: #fff;
            border-radius: 3px;
            width: 100%; }

          .wrapper {
            box-sizing: border-box;
            padding: 20px; }

          .footer {
            clear: both;
            padding-top: 10px;
            text-align: center;
            width: 100%; }
            .footer td,
            .footer p,
            .footer span,
            .footer a {
              color: #999999;
              font-size: 12px;
              text-align: center; }

          /* -------------------------------------
              TYPOGRAPHY
          ------------------------------------- */
          h1,
          h2,
          h3,
          h4 {
            color: #000000;
            font-family: sans-serif;
            font-weight: 400;
            line-height: 1.4;
            margin: 0;
            Margin-bottom: 30px; }

          h1 {
            font-size: 35px;
            font-weight: 300;
            text-align: center;
            text-transform: capitalize; }

          p,
          ul,
          ol {
            font-family: sans-serif;
            font-size: 14px;
            font-weight: normal;
            margin: 0;
            Margin-bottom: 15px; }
            p li,
            ul li,
            ol li {
              list-style-position: inside;
              margin-left: 5px; }

          a {
            color: #3498db;
            text-decoration: underline; }

          /* -------------------------------------
              BUTTONS
          ------------------------------------- */
          .btn {
            box-sizing: border-box;
            width: 100%; }
            .btn > tbody > tr > td {
              padding-bottom: 15px; }
            .btn table {
              width: auto; }
            .btn table td {
              background-color: #ffffff;
              border-radius: 5px;
              text-align: center; }
            .btn a {
              background-color: #ffffff;
              border: solid 1px #3498db;
              border-radius: 5px;
              box-sizing: border-box;
              color: #3498db;
              cursor: pointer;
              display: inline-block;
              font-size: 14px;
              font-weight: bold;
              margin: 0;
              padding: 6px 18px;
              text-decoration: none;
              text-transform: capitalize; }

          .btn-primary table td {
            background-color: #15549a; }

          .btn-primary a {
            background-color: #15549a;
            border-color: #15549a;
            color: #ffffff; }

          /* -------------------------------------
              OTHER STYLES THAT MIGHT BE USEFUL
          ------------------------------------- */
          .last {
            margin-bottom: 0; }

          .first {
            margin-top: 0; }

          .align-center {
            text-align: center; }

          .align-right {
            text-align: right; }

          .align-left {
            text-align: left; }

          .clear {
            clear: both; }

          .mt0 {
            margin-top: 0; }

          .mb0 {
            margin-bottom: 0; }

          .preheader {
            color: transparent;
            display: none;
            height: 0;
            max-height: 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
            mso-hide: all;
            visibility: hidden;
            width: 0; }

          .powered-by a {
            text-decoration: none; }

          hr {
            border: 0;
            border-bottom: 1px solid #f6f6f6;
            Margin: 20px 0; }

          /* -------------------------------------
              RESPONSIVE AND MOBILE FRIENDLY STYLES
          ------------------------------------- */
          @media only screen and (max-width: 620px) {
            table[class=body] h1 {
              font-size: 28px !important;
              margin-bottom: 10px !important; }
            table[class=body] p,
            table[class=body] ul,
            table[class=body] ol,
            table[class=body] td,
            table[class=body] span,
            table[class=body] a {
              font-size: 16px !important; }
            table[class=body] .wrapper,
            table[class=body] .article {
              padding: 10px !important; }
            table[class=body] .content {
              padding: 0 !important; }
            table[class=body] .container {
              padding: 0 !important;
              width: 100% !important; }
            table[class=body] .main {
              border-left-width: 0 !important;
              border-radius: 0 !important;
              border-right-width: 0 !important; }
            table[class=body] .btn table {
              width: 100% !important; }
            table[class=body] .btn a {
              width: 100% !important; }
            table[class=body] .img-responsive {
              height: auto !important;
              max-width: 100% !important;
              width: auto !important; }}

          /* -------------------------------------
              PRESERVE THESE STYLES IN THE HEAD
          ------------------------------------- */
          @media all {
            .ExternalClass {
              width: 100%; }
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
              line-height: 100%; }
            .apple-link a {
              color: inherit !important;
              font-family: inherit !important;
              font-size: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
              text-decoration: none !important; } 
            .btn-primary table td:hover {
              background-color: #34495e !important; }
            .btn-primary a:hover {
              background-color: #34495e !important;
              border-color: #34495e !important; } }

        </style>
      </head>
      <body class="">
        <table border="0" cellpadding="0" cellspacing="0" class="body">
          <tr>
            <td>&nbsp;</td>
            <td class="container">
              <div class="content">

                <!-- START CENTERED WHITE CONTAINER -->
                <span class="preheader"></span>
                <table class="main">

                  <!-- START MAIN CONTENT AREA -->
                  <tr>
                    <td class="wrapper">
                      <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <img src="https://www.pips-pro.com/images/logo.png">
                            <br>
                            <br>
                            <br>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Hi ${data.name},</p>
                            <br>
                            <p>Thank you for your registration at <a href="${process.env.HOST}" target="_blank">pips-pro.com</a>.</p>
                            <br>
                            <p><b>Your account info:</b></p>
                            <p><u>Email</u></p>
                            <p>${data.email}</p>
                            <p><u>Mobile</u></p>
                            <p>${data.mobile}</p>
                            <p>Please ensure that your mobile number is correct, as it will be used to receive your forex signal sms. You can change your mobile number at anytime in the Edit Account section.</p>
                            <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                              <tbody>
                                <tr>
                                  <td align="left">
                                    <table border="0" cellpadding="0" cellspacing="0">
                                      <tbody>
                                        <tr>
                                          <td> <a href="${process.env.HOST}#buy-signals-1" target="_blank">Change mobile number</a> </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <br>
                            <p><b>With an account, you can:</b></p>
                            <p>* Purchase a signal package, choose among the 1-month, 3-month and 6-month packages</p>
                            <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                              <tbody>
                                <tr>
                                  <td align="left">
                                    <table border="0" cellpadding="0" cellspacing="0">
                                      <tbody>
                                        <tr>
                                          <td> <a href="${process.env.HOST}#buy-signals-1" target="_blank">Purchase a Signal Package</a> </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <p>* View all your past transactions</p>
                            <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                              <tbody>
                                <tr>
                                  <td align="left">
                                    <table border="0" cellpadding="0" cellspacing="0">
                                      <tbody>
                                        <tr>
                                          <td> <a href="${process.env.HOST}my-account/transactions.html" target="_blank">View Transactions</a> </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <br>
                            <p>For assistance, please drop us an email at admin@pips-pro.com</p>
                            <br>
                            <p>Thanks and happy trading!</p>
                            <p><strong>Pips-Pro Team</strong></p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- END MAIN CONTENT AREA -->
                  </table>

                <!-- START FOOTER -->
                <div class="footer">
                  <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td class="content-block">
                        <span class="apple-link">Pips-Pro.com</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="content-block powered-by">
                        Whatsapp us at 016-214-0200 for immediate inquiry and service
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- END FOOTER -->
                
    <!-- END CENTERED WHITE CONTAINER --></div>
            </td>
            <td>&nbsp;</td>
          </tr>
        </table>
      </body>
    </html>

`