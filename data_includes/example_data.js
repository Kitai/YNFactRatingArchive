///////////////////////////////////////////////////
// Hack for retreiving parameters from the URL
//
var Parameters = {},
    URLParameters = window.location.search.replace("?", "").split("&");

for (parameter in URLParameters) Parameters[URLParameters[parameter].split("=")[0]] = URLParameters[parameter].split("=")[1];

var shuffleSequence;
var debugDisplay = "none";

// Pay attention to case for "Order"
if (Parameters.Debug == "true") debugDisplay = "block";
if (Parameters.Home == "true") shuffleSequence = seq("Homepage");
//
///////////////////////////////////////////////////

else
    shuffleSequence = seq("instructions", "practice",rshuffle(startsWith("Exp1")),rshuffle(startsWith("Exp2")), "post-exp");
var practiceItemTypes = ["practice"];
var manualSendResults = true;
var showProgressBar = false;

var defaults = [
    
    "DynamicQuestion", {
        answers: {
            // The labels are defined in global_z.css
            CompUnnatural: ["1", "1"],
            Unnatural: ["2", "2"],
            NotNatural: ["3", "3"],
            Average: ["4", "4"],
            Natural: ["5", "5"],
            QuiteNatural: ["6", "6"],
            CompNatural: ["7", "7"]
        }
    }

];

var items = GetItemsFrom(data, null, {
    
    ItemGroup: ["Item", "Group"],
                         
    Elements:

    [
        function(row){ return "Exp"+row.Block+row.Cond; },
        "DynamicQuestion", {
            
            legend: function(row){
                return $("<p>").html(
                                    ["<b>Block</b>_"+row.Block, "<b>Cond</b>_"+row.Cond, "<b>Item</b>_"+row.Item, "<b>Group</b>_"+row.Group, 
                                     "<b>Question</b>_"+row.Question, "<b>Answer</b>_"+row.YesNoAnswer].join('+')
                                    ).css("display",debugDisplay); },
            q: function(row){ return "<p style='font-weight: bold;'> - "+row.Question+"</p>"; },
            a: function(row){ return "<p style='font-style: italic; margin-bottom: 1em;'> - "+row.YesNoAnswer+"</p>"; },
            
            sequence: [
                
                {this: "legend"}
                {this: "q"},
                {pause: "key ", tempMessage: "Press Space", newRT: true},
                {this: "a"},
                {pause: "key ", tempMessage: "Press Space", newRT: true},
                "the answer to this question is...",
                {this: "answers"}        
             
            ]
        
        }

    ]
                         
}).concat(
    
  [

    ["Homepage", "Message", {html: {include: "Choice.html"}, transfer: null}],  
      
    ["instructions",
     "Form", {
         html: {include: "IbexConsentSona.html"}
     }
    ],

    ["instructions",
     "Form", {
         html: {include: "IbexInstructions.html"}
     }
    ],

    ["post-exp",
     "Form", {
         html: {include: "IbexFeedbackPreConfirmation.html"}
     }
    ],

    ["post-exp",
     "Form", {
         html: {include: "IbexConfirmationPage.html"}
     }
    ],

    ["post-exp", "__SendResults__", {}],
      

    ["post-exp",
     "Message", {
         html: {include: "IbexDebriefing.html"},
         transfer: null
     }
    ],
      
    
    ["practice",
     "DynamicQuestion", {
     
         legend: "practice",
         q: "<p style='font-weight: bold;'> - Does John think that it's going to snow tomorrow?</p>",
         a: "<p style='font-style: italic; margin-bottom: 1em;'> - Yes, although it's not.</p>",
         enabled: false,

         sequence: [
             
             {pause: "key ", tempMessage: "This is a practice item. Press Space."},
             {this: "q"},
             {pause: "key ", tempMessage: "You will first see a question. Press Space."},
             {this: "a"},
             {pause: "key ", tempMessage: "And then an answer. Press Space."},
             "the answer to this question is...",
             {this: "answers"},
             {pause: "key ", tempMessage: "Your task will be to judge how appropriate the sentence in italic is as an answer to the question in bold. Press Space."},
             {pause: "key ", tempMessage: "Click or press 1 if you find the answer completely inappropriate... Press Space."},
             {pause: "key ", tempMessage: "click or press 7 if you find it completely appropriate... Press Space."},
             {pause: "key ", tempMessage: "or click or press a number in between if your judgment is less strong. Press Space, then press or click a number."},
             function(t){ t.enabled = true; }
             
         ]
         
     }
    ],
      
    ["practice",
     "DynamicQuestion", {
     
         legend: "practice",
         q: "<p style='font-weight: bold;'> - Did Germany win the world cup?</p>",
         a: "<p style='font-style: italic; margin-bottom: 1em;'> - Yes, although they didn't.</p>",
         enabled: false,

         sequence: [
             
             {pause: "key ", tempMessage: "This is a second practice item. Press Space."},
             {this: "q"},
             {pause: "key ", tempMessage: "Press Space."},
             {this: "a"},
             {pause: "key ", tempMessage: "Press Space."},
             "the answer to this question is...",
             {this: "answers"},
             {pause: "key ", tempMessage: "Now press Space, then press or click a number to give your judgment."},
             function(t){ t.enabled = true; }
             
         ]
         
     }
    ],
      
    ["practice",
     "Separator", {
     transfer: "keypress",
     normalMessage: "Thank you. Now press any key to proceed the actual experiment."
    }]

  ]
    
);
