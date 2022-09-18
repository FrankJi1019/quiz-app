using Server.Data;
using Server.Models;

namespace Server;

public class Seed {
    private readonly DataContext _context;

    public Seed(DataContext context) {
        this._context = context;
    }

    public void SeedDataContext() {
        // if (this._context.Users.Any()) return;
        
        this._context.Users.RemoveRange(this._context.Users.ToList());
        this._context.Topics.RemoveRange(this._context.Topics.ToList());
        this._context.Settings.RemoveRange(this._context.Settings.ToList());
        this._context.Quizzes.RemoveRange(this._context.Quizzes.ToList());
        this._context.Sessions.RemoveRange(this._context.Sessions.ToList());

        // users
        var alice = new User { Username = "Alice", Setting = new Setting() };
        var bob = new User { Username = "Bob", Setting = new Setting() };
        var cathy = new User { Username = "Cathy", Setting = new Setting() };
        var david = new User { Username = "David", Setting = new Setting() };
        var emma = new User { Username = "Emma", Setting = new Setting() };
        var franklin = new User { Username = "Franklin", Setting = new Setting() };
        var gina = new User { Username = "Gina", Setting = new Setting() };
        var hank = new User { Username = "Hank", Setting = new Setting() };

        this._context.Users.Add(alice);
        this._context.Users.Add(bob);
        this._context.Users.Add(cathy);
        this._context.Users.Add(david);
        this._context.Users.Add(emma);
        this._context.Users.Add(franklin);
        this._context.Users.Add(gina);
        this._context.Users.Add(hank);

        // topics
        var mathTopic = new Topic { Name = "math" };
        var programmingTopic = new Topic { Name = "programming" };
        var funTopic = new Topic { Name = "fun" };
        var elementaryTopic = new Topic { Name = "elementary" };
        var sportTopic = new Topic { Name = "sport" };

        this._context.Topics.Add(mathTopic);
        this._context.Topics.Add(programmingTopic);
        this._context.Topics.Add(funTopic);
        this._context.Topics.Add(elementaryTopic);
        this._context.Topics.Add(sportTopic);

        // quizzes, questions, options
        var simpleMathQ1Correct = new Option { Content = "9", IsCorrect = true };
        var simpleMathQ1Wrong1 = new Option { Content = "1", IsCorrect = false };
        var simpleMathQ1Wrong2 = new Option { Content = "3", IsCorrect = false };
        var simpleMathQ1Wrong3 = new Option { Content = "5", IsCorrect = false };
        var simpleMathQ1Wrong4 = new Option { Content = "7", IsCorrect = false };

        var simpleMathQ1 = new Question {
            Content = "What is 3 + 6?",
            Explanation = "Just simple addition",
            Options = new List<Option> {
                simpleMathQ1Wrong1, simpleMathQ1Wrong2, simpleMathQ1Wrong3, simpleMathQ1Wrong4, simpleMathQ1Correct,
            }
        };
        
        var simpleMathQ2Correct = new Option { Content = "27", IsCorrect = true };
        var simpleMathQ2Wrong1 = new Option { Content = "9", IsCorrect = false };
        var simpleMathQ2Wrong2 = new Option { Content = "18", IsCorrect = false };
        var simpleMathQ2Wrong3 = new Option { Content = "36", IsCorrect = false };
        var simpleMathQ2Wrong4 = new Option { Content = "45", IsCorrect = false };

        var simpleMathQ2 = new Question {
            Content = "3 * 9 = ?",
            Explanation = "",
            Options = new List<Option> {
                simpleMathQ2Wrong1, simpleMathQ2Wrong2, simpleMathQ2Correct, simpleMathQ2Wrong3, simpleMathQ2Wrong4
            }
        };

        var simpleMathQ3Correct = new Option { Content = "false", IsCorrect = true };
        var simpleMathQ3Wrong1 = new Option { Content = "true", IsCorrect = false };
        var simpleMathQ3Wrong2 = new Option { Content = "none of above:)", IsCorrect = false };

        var simpleMathQ3 = new Question {
            Content = "-1 - 7 = 6",
            Explanation = "",
            Options = new List<Option> {
                simpleMathQ3Wrong1, simpleMathQ3Correct, simpleMathQ3Wrong2
            }
        };

        var simpleMathQ4Correct = new Option { Content = "0 = 4", IsCorrect = true };
        var simpleMathQ4Wrong1 = new Option { Content = "2 = 2", IsCorrect = false };
        var simpleMathQ4Wrong2 = new Option { Content = "5 = 1", IsCorrect = false };

        var simpleMathQ4 = new Question {
            Content = "If 1 = 3, then",
            Explanation = "Count the number of letters",
            Options = new List<Option> {
                simpleMathQ4Wrong1, simpleMathQ4Wrong2, simpleMathQ4Correct
            }
        };

        var simpleMathQ5Correct = new Option { Content = "negative two", IsCorrect = true };
        var simpleMathQ5Wrong1 = new Option { Content = "two", IsCorrect = false };
        var simpleMathQ5Wrong2 = new Option { Content = "one", IsCorrect = false };
        var simpleMathQ5Wrong3 = new Option { Content = "negative one", IsCorrect = false };

        var simpleMathQ5 = new Question {
            Content = "35x = -70, then x is?",
            Explanation = "",
            Options = new List<Option> {
                simpleMathQ5Wrong1, simpleMathQ5Correct, simpleMathQ5Wrong2, simpleMathQ5Wrong3
            }
        };

        var simpleMathQuiz = new Quiz {
            Name = "Simple Math Questions",
            Description = "",
            Author = alice,
            Topics = new List<Topic> { mathTopic, elementaryTopic },
            Questions = new List<Question> {
                simpleMathQ1, simpleMathQ2, simpleMathQ3, simpleMathQ4, simpleMathQ5
            }
        };

        var helloWorldQ1Correct = new Option { Content = "print(\"Hello World\")", IsCorrect = true };
        var helloWorldQ1Wrong1 = new Option { Content = "print(\"Hello World\");", IsCorrect = false };
        var helloWorldQ1Wrong2 = new Option { Content = "printf(\"Hello World\");", IsCorrect = false };
        var helloWorldQ1Wrong3 = new Option { Content = "printf(\"Hello World\")", IsCorrect = false };

        var helloWorldQ1 = new Question {
            Content = "Python",
            Explanation = "",
            Options = new List<Option> {
                helloWorldQ1Wrong1, helloWorldQ1Correct, helloWorldQ1Wrong2, helloWorldQ1Wrong3
            }
        };
        
        var helloWorldQ2Correct = new Option { Content = "console.log(\"Hello World\")", IsCorrect = true };
        var helloWorldQ2Wrong1 = new Option { Content = "console.err(\"Hello World\")", IsCorrect = false };
        var helloWorldQ2Wrong2 = new Option { Content = "console.write(\"Hello World\")", IsCorrect = false };
        var helloWorldQ2Wrong3 = new Option { Content = "console.writeline(\"Hello World\")", IsCorrect = false };

        var helloWorldQ2 = new Question {
            Content = "Javascript",
            Explanation = "",
            Options = new List<Option> {
                helloWorldQ2Wrong1, helloWorldQ2Correct, helloWorldQ2Wrong2, helloWorldQ2Wrong3
            }
        };

        var helloWorldQ3Correct = new Option { Content = "System.out.println(\"Hello World\");", IsCorrect = true };
        var helloWorldQ3Wrong1 = new Option { Content = "System.out.println(\"Hello World\")", IsCorrect = false };
        var helloWorldQ3Wrong2 = new Option { Content = "system.out.println(\"Hello World\")", IsCorrect = false };
        var helloWorldQ3Wrong3 = new Option { Content = "system.out.println(\"Hello World\");", IsCorrect = false };

        var helloWorldQ3 = new Question {
            Content = "Java",
            Explanation = "",
            Options = new List<Option> {
                helloWorldQ3Wrong1, helloWorldQ3Correct, helloWorldQ3Wrong2, helloWorldQ3Wrong3
            }
        };

        var helloWorldQ4Correct = new Option { Content = "cout << \"Hello World\";", IsCorrect = true };
        var helloWorldQ4Wrong1 = new Option { Content = "cout(\"Hello World\");", IsCorrect = false };
        var helloWorldQ4Wrong2 = new Option { Content = "cout >> \"Hello World\";", IsCorrect = false };

        var helloWorldQ4 = new Question {
            Content = "C++",
            Explanation = "",
            Options = new List<Option> {
                helloWorldQ4Correct, helloWorldQ4Wrong1, helloWorldQ4Wrong2
            }
        };

        var helloWorldQ5Correct = new Option 
            { Content = "Not possible, HTML is not a programming language!", IsCorrect = true };
        var helloWorldQ5Wrong1 = new Option { Content = "<h1>Hello World</h1>", IsCorrect = false };
        var helloWorldQ5Wrong2 = new Option { Content = "<div>Hello World</div>", IsCorrect = false };
        var helloWorldQ5Wrong3 = new Option { Content = "<p>Hello World</p>", IsCorrect = false };

        var helloWorldQ5 = new Question {
            Content = "HTML",
            Explanation = "",
            Options = new List<Option> {
                helloWorldQ5Wrong1, helloWorldQ5Wrong2, helloWorldQ5Wrong3, helloWorldQ5Correct
            }
        };

        var helloWorldQuiz = new Quiz {
            Name = "Hello World",
            Description = "How to output \"Hello World\" in different programming languages",
            Author = bob,
            Topics = new List<Topic> { programmingTopic, elementaryTopic },
            Questions = new List<Question> {
                helloWorldQ1, helloWorldQ2, helloWorldQ3, helloWorldQ4, helloWorldQ5
            }
        };

        var oddOneOutQ1Correct = new Option { Content = "Shark", IsCorrect = true };
        var oddOneOutQ1Wrong1 = new Option { Content = "Dog", IsCorrect = false };
        var oddOneOutQ1Wrong2 = new Option { Content = "Lion", IsCorrect = false };
        var oddOneOutQ1Wrong3 = new Option { Content = "Cat", IsCorrect = false };

        var oddOneOutQ1 = new Question {
            Content = "Animals",
            Explanation = "One sharks live in water",
            Options = new List<Option> {
                oddOneOutQ1Wrong1, oddOneOutQ1Correct, oddOneOutQ1Wrong2, oddOneOutQ1Wrong3
            }
        };

        var oddOneOutQ2Correct = new Option { Content = "Ross", IsCorrect = true };
        var oddOneOutQ2Wrong1 = new Option { Content = "Tree", IsCorrect = false };
        var oddOneOutQ2Wrong2 = new Option { Content = "Grass", IsCorrect = false };
        var oddOneOutQ2Wrong3 = new Option { Content = "Herbs", IsCorrect = false };

        var oddOneOutQ2 = new Question {
            Content = "Plant",
            Explanation = "Only ross is not green",
            Options = new List<Option> {
                oddOneOutQ2Wrong1, oddOneOutQ2Wrong2, oddOneOutQ2Correct, oddOneOutQ2Wrong3
            }
        };

        var oddOneOutQ3Correct = new Option { Content = "C", IsCorrect = true };
        var oddOneOutQ3Wrong1 = new Option { Content = "Javascript", IsCorrect = false };
        var oddOneOutQ3Wrong2 = new Option { Content = "Ruby", IsCorrect = false };
        var oddOneOutQ3Wrong3 = new Option { Content = "Python", IsCorrect = false };

        var oddOneOutQ3 = new Question {
            Content = "Tech",
            Explanation = "C is not a scripting language, while the others are not",
            Options = new List<Option> {
                oddOneOutQ3Wrong1, oddOneOutQ3Wrong2, oddOneOutQ3Wrong3, oddOneOutQ3Correct
            }
        };

        var oddOneOutQ4Correct = new Option { Content = "USA", IsCorrect = true };
        var oddOneOutQ4Wrong1 = new Option { Content = "Japan", IsCorrect = false };
        var oddOneOutQ4Wrong2 = new Option { Content = "Korea", IsCorrect = false };
        var oddOneOutQ4Wrong3 = new Option { Content = "Singapore", IsCorrect = false };

        var oddOneOutQ4 = new Question {
            Content = "Countries",
            Explanation = "Only USA is not in asia",
            Options = new List<Option> {
                oddOneOutQ4Wrong1, oddOneOutQ4Correct, oddOneOutQ4Wrong2, oddOneOutQ4Wrong3
            }
        };

        var oddOneOutQ5Correct = new Option { Content = "Black", IsCorrect = true };
        var oddOneOutQ5Wrong1 = new Option { Content = "Orange", IsCorrect = false };
        var oddOneOutQ5Wrong2 = new Option { Content = "Blue", IsCorrect = false };
        var oddOneOutQ5Wrong3 = new Option { Content = "Red", IsCorrect = false };

        var oddOneOutQ5 = new Question {
            Content = "Colors",
            Explanation = "Only black is not a color in the rainbow",
            Options = new List<Option> {
                oddOneOutQ5Correct, oddOneOutQ5Wrong1, oddOneOutQ5Wrong2, oddOneOutQ5Wrong3
            }
        };

        var oddOneOutQ6Correct = new Option { Content = "Batman", IsCorrect = true };
        var oddOneOutQ6Wrong1 = new Option { Content = "Icon man", IsCorrect = false };
        var oddOneOutQ6Wrong2 = new Option { Content = "Spider man", IsCorrect = false };
        var oddOneOutQ6Wrong3 = new Option { Content = "Doctor strange", IsCorrect = false };

        var oddOneOutQ6 = new Question {
            Content = "Heroes",
            Explanation = "Batman is the only DC hero!",
            Options = new List<Option> {
                oddOneOutQ6Correct, oddOneOutQ6Wrong1, oddOneOutQ6Wrong2, oddOneOutQ6Wrong3
            }
        };

        var oddOneOutQ7Correct = new Option { Content = "Electronics", IsCorrect = true };
        var oddOneOutQ7Wrong1 = new Option { Content = "Calculus", IsCorrect = false };
        var oddOneOutQ7Wrong2 = new Option { Content = "Statistics", IsCorrect = false };
        var oddOneOutQ7Wrong3 = new Option { Content = "Linear Algebra", IsCorrect = false };

        var oddOneOutQ7 = new Question {
            Content = "Subjects",
            Explanation = "Electronics is not a branch of math",
            Options = new List<Option> {
                oddOneOutQ7Wrong1, oddOneOutQ7Wrong2, oddOneOutQ7Wrong3, oddOneOutQ7Correct
            }
        };

        var oddOneOutQuiz = new Quiz {
            Name = "Odd One Out",
            Description = "Choose the one that is different to others",
            Author = bob,
            Topics = new List<Topic> { funTopic },
            Questions = new List<Question> {
                oddOneOutQ1, oddOneOutQ2, oddOneOutQ3, oddOneOutQ4, oddOneOutQ5, oddOneOutQ6, oddOneOutQ7
            }
        };

        var webQ1Correct = new Option { Content = "Angular", IsCorrect = true };
        var webQ1Wrong1 = new Option { Content = "React", IsCorrect = false };
        var webQ1Wrong2 = new Option { Content = "JQuery", IsCorrect = false };
        
        var webQ1 = new Question {
            Content = "Which of this is a front end framework",
            Explanation = "React is a library, not a framework",
            Options = new List<Option> {
                webQ1Correct, webQ1Wrong1, webQ1Wrong2
            }
        };
        
        var webQ2Correct = new Option { Content = "World Wide Web Consortium", IsCorrect = true };
        var webQ2Wrong1 = new Option { Content = "World Wealthy Web Consortium", IsCorrect = false };
        var webQ2Wrong2 = new Option { Content = "World Warehouse Web Consortium", IsCorrect = false };
        
        var webQ2 = new Question {
            Content = "What does W3C stand for?",
            Explanation = "",
            Options = new List<Option> {
                webQ2Wrong1, webQ2Correct, webQ2Wrong2
            }
        };
        
        var webQ3Correct = new Option { Content = "HTML", IsCorrect = true };
        var webQ3Wrong1 = new Option { Content = "Java", IsCorrect = false };
        var webQ3Wrong2 = new Option { Content = "PHP", IsCorrect = false };
        var webQ3Wrong3 = new Option { Content = "Javascript", IsCorrect = false };
        
        var webQ3 = new Question {
            Content = "Which of the following language is NOT a backend language?",
            Explanation = "",
            Options = new List<Option> {
                webQ3Wrong1, webQ3Wrong2, webQ3Wrong3, webQ3Correct
            }
        };
        
        var webQuiz = new Quiz {
            Name = "Web",
            Description = "Some web dev knowledge",
            Author = alice,
            Topics = new List<Topic> { programmingTopic },
            Questions = new List<Question> {
                webQ1, webQ2, webQ3
            }
        };
        
        var sportQ1Correct = new Option { Content = "22", IsCorrect = true };
        var sportQ1Wrong1 = new Option { Content = "11", IsCorrect = false };
        var sportQ1Wrong2 = new Option { Content = "10", IsCorrect = false };
        var sportQ1Wrong3 = new Option { Content = "20", IsCorrect = false };
        
        var sportQ1 = new Question {
            Content = "How many people are in one soccer game?",
            Explanation = "",
            Options = new List<Option> {
                sportQ1Wrong1, sportQ1Correct, sportQ1Wrong2, sportQ1Wrong3
            }
        };
        
        var sportQ2Correct = new Option { Content = "10", IsCorrect = true };
        var sportQ2Wrong1 = new Option { Content = "8", IsCorrect = false };
        var sportQ2Wrong2 = new Option { Content = "5", IsCorrect = false };
        var sportQ2Wrong3 = new Option { Content = "4", IsCorrect = false };
        
        var sportQ2 = new Question {
            Content = "How many people are in basketball team?",
            Explanation = "",
            Options = new List<Option> {
                sportQ2Wrong1, sportQ2Correct, sportQ2Wrong2, sportQ2Wrong3
            }
        };
        
        var sportQ3Correct = new Option { Content = "15", IsCorrect = true };
        var sportQ3Wrong1 = new Option { Content = "5", IsCorrect = false };
        var sportQ3Wrong2 = new Option { Content = "10", IsCorrect = false };
        var sportQ3Wrong3 = new Option { Content = "20", IsCorrect = false };
        
        var sportQ3 = new Question {
            Content = "How many people are in rugby team?",
            Explanation = "",
            Options = new List<Option> {
                sportQ3Wrong1, sportQ3Wrong2, sportQ3Correct, sportQ3Wrong3
            }
        };
        
        var sportQ4Correct = new Option { Content = "6", IsCorrect = true };
        var sportQ4Wrong1 = new Option { Content = "7", IsCorrect = false };
        var sportQ4Wrong2 = new Option { Content = "8", IsCorrect = false };
        var sportQ4Wrong3 = new Option { Content = "9", IsCorrect = false };
        
        var sportQ4 = new Question {
            Content = "How many people are in volleyball team?",
            Explanation = "",
            Options = new List<Option> {
                sportQ4Correct, sportQ4Wrong1, sportQ4Wrong2, sportQ4Wrong3
            }
        };
        
        var sportQuiz = new Quiz {
            Name = "How many people?",
            Description = "",
            Author = alice,
            Topics = new List<Topic> { funTopic, sportTopic },
            Questions = new List<Question> {
                sportQ1, sportQ2, sportQ3, sportQ4
            }
        };

        this._context.Quizzes.Add(simpleMathQuiz);
        this._context.Quizzes.Add(helloWorldQuiz);
        this._context.Quizzes.Add(oddOneOutQuiz);
        this._context.Quizzes.Add(webQuiz);
        this._context.Quizzes.Add(sportQuiz);
        
        // sessions, attempts

        // -- simple math
        var aliceSimpleMath = new Session {
            Quiz = simpleMathQuiz,
            User = alice,
            Attempts = new List<Attempt> {
                new Attempt { Question = simpleMathQ1, Option = simpleMathQ1Wrong1 },
                new Attempt { Question = simpleMathQ2, Option = simpleMathQ2Wrong3 },
                new Attempt { Question = simpleMathQ3, Option = simpleMathQ3Wrong2 },
                new Attempt { Question = simpleMathQ4, Option = simpleMathQ4Correct },
                new Attempt { Question = simpleMathQ5, Option = simpleMathQ5Correct },
            }
        };
        
        var davidSimpleMath = new Session {
            Quiz = simpleMathQuiz,
            User = david,
            Attempts = new List<Attempt> {
                new Attempt { Question = simpleMathQ1, Option = simpleMathQ1Correct },
                new Attempt { Question = simpleMathQ2, Option = simpleMathQ2Wrong1 },
                new Attempt { Question = simpleMathQ3, Option = simpleMathQ3Wrong1 },
                new Attempt { Question = simpleMathQ4, Option = simpleMathQ4Correct },
                new Attempt { Question = simpleMathQ5, Option = simpleMathQ5Correct },
            }
        };
        
        var emmaSimpleMath = new Session {
            Quiz = simpleMathQuiz,
            User = emma,
            Attempts = new List<Attempt> {
                new Attempt { Question = simpleMathQ1, Option = simpleMathQ1Correct },
                new Attempt { Question = simpleMathQ2, Option = simpleMathQ2Correct },
                new Attempt { Question = simpleMathQ3, Option = simpleMathQ3Correct },
                new Attempt { Question = simpleMathQ4, Option = simpleMathQ4Correct },
                new Attempt { Question = simpleMathQ5, Option = simpleMathQ5Correct },
            }
        };
        
        var franklinSimpleMath = new Session {
            Quiz = simpleMathQuiz,
            User = franklin,
            Attempts = new List<Attempt> {
                new Attempt { Question = simpleMathQ1, Option = simpleMathQ1Correct },
                new Attempt { Question = simpleMathQ2, Option = simpleMathQ2Correct },
                new Attempt { Question = simpleMathQ3, Option = simpleMathQ3Correct },
                new Attempt { Question = simpleMathQ4, Option = simpleMathQ4Correct },
                new Attempt { Question = simpleMathQ5, Option = simpleMathQ5Correct },
            }
        };
        
        // -- hello world
        var aliceHelloWorld = new Session {
            Quiz = helloWorldQuiz,
            User = alice,
            Attempts = new List<Attempt> {
                new Attempt { Question = helloWorldQ1, Option = helloWorldQ1Correct },
                new Attempt { Question = helloWorldQ2, Option = helloWorldQ2Correct },
                new Attempt { Question = helloWorldQ3, Option = helloWorldQ3Correct },
                new Attempt { Question = helloWorldQ4, Option = helloWorldQ4Correct },
                new Attempt { Question = helloWorldQ5, Option = helloWorldQ5Correct },
            }
        };
        
        var bobHelloWorld = new Session {
            Quiz = helloWorldQuiz,
            User = bob,
            Attempts = new List<Attempt> {
                new Attempt { Question = helloWorldQ1, Option = helloWorldQ1Correct },
                new Attempt { Question = helloWorldQ2, Option = helloWorldQ2Correct },
                new Attempt { Question = helloWorldQ3, Option = helloWorldQ3Wrong1 },
                new Attempt { Question = helloWorldQ4, Option = helloWorldQ4Correct },
                new Attempt { Question = helloWorldQ5, Option = helloWorldQ5Correct },
            }
        };
        
        var cathyHelloWorld = new Session {
            Quiz = helloWorldQuiz,
            User = cathy,
            Attempts = new List<Attempt> {
                new Attempt { Question = helloWorldQ1, Option = helloWorldQ1Correct },
                new Attempt { Question = helloWorldQ2, Option = helloWorldQ2Correct },
                new Attempt { Question = helloWorldQ3, Option = helloWorldQ3Correct },
                new Attempt { Question = helloWorldQ4, Option = helloWorldQ4Correct },
                new Attempt { Question = helloWorldQ5, Option = helloWorldQ5Wrong2 },
            }
        };
        
        var davidHelloWorld = new Session {
            Quiz = helloWorldQuiz,
            User = david,
            Attempts = new List<Attempt> {
                new Attempt { Question = helloWorldQ1, Option = helloWorldQ1Wrong1 },
                new Attempt { Question = helloWorldQ2, Option = helloWorldQ2Correct },
                new Attempt { Question = helloWorldQ3, Option = helloWorldQ3Correct },
                new Attempt { Question = helloWorldQ4, Option = helloWorldQ4Correct },
                new Attempt { Question = helloWorldQ5, Option = helloWorldQ5Wrong3 },
            }
        };
        
        var emmaHelloWorld = new Session {
            Quiz = helloWorldQuiz,
            User = emma,
            Attempts = new List<Attempt> {
                new Attempt { Question = helloWorldQ1, Option = helloWorldQ1Correct },
                new Attempt { Question = helloWorldQ2, Option = helloWorldQ2Correct },
                new Attempt { Question = helloWorldQ3, Option = helloWorldQ3Correct },
                new Attempt { Question = helloWorldQ4, Option = helloWorldQ4Correct },
                new Attempt { Question = helloWorldQ5, Option = helloWorldQ5Correct },
            }
        };
        
        var franklinHelloWorld = new Session {
            Quiz = helloWorldQuiz,
            User = franklin,
            Attempts = new List<Attempt> {
                new Attempt { Question = helloWorldQ1, Option = helloWorldQ1Correct },
                new Attempt { Question = helloWorldQ2, Option = helloWorldQ2Correct },
                new Attempt { Question = helloWorldQ3, Option = helloWorldQ3Correct },
                new Attempt { Question = helloWorldQ4, Option = helloWorldQ4Correct },
                new Attempt { Question = helloWorldQ5, Option = helloWorldQ5Correct },
            }
        };
        
        var ginaHelloWorld = new Session {
            Quiz = helloWorldQuiz,
            User = gina,
            Attempts = new List<Attempt> {
                new Attempt { Question = helloWorldQ1, Option = helloWorldQ1Correct },
                new Attempt { Question = helloWorldQ2, Option = helloWorldQ2Correct },
                new Attempt { Question = helloWorldQ3, Option = helloWorldQ3Correct },
                new Attempt { Question = helloWorldQ4, Option = helloWorldQ4Correct },
                new Attempt { Question = helloWorldQ5, Option = helloWorldQ5Correct },
            }
        };
        
        // -- odd one out
        var bobOddOneOut = new Session {
            Quiz = oddOneOutQuiz,
            User = bob,
            Attempts = new List<Attempt> {
                new Attempt { Question = oddOneOutQ1, Option = oddOneOutQ1Correct },
                new Attempt { Question = oddOneOutQ2, Option = oddOneOutQ2Correct },
                new Attempt { Question = oddOneOutQ3, Option = oddOneOutQ3Correct },
                new Attempt { Question = oddOneOutQ4, Option = oddOneOutQ4Correct },
                new Attempt { Question = oddOneOutQ5, Option = oddOneOutQ5Correct },
                new Attempt { Question = oddOneOutQ6, Option = oddOneOutQ6Correct },
                new Attempt { Question = oddOneOutQ7, Option = oddOneOutQ7Correct }
            }
        };
        
        var davidOddOneOut = new Session {
            Quiz = oddOneOutQuiz,
            User = david,
            Attempts = new List<Attempt> {
                new Attempt { Question = oddOneOutQ1, Option = oddOneOutQ1Correct },
                new Attempt { Question = oddOneOutQ2, Option = oddOneOutQ2Correct },
                new Attempt { Question = oddOneOutQ3, Option = oddOneOutQ3Correct },
                new Attempt { Question = oddOneOutQ4, Option = oddOneOutQ4Correct },
                new Attempt { Question = oddOneOutQ5, Option = oddOneOutQ5Correct },
                new Attempt { Question = oddOneOutQ6, Option = oddOneOutQ6Correct },
                new Attempt { Question = oddOneOutQ7, Option = oddOneOutQ7Correct }
            }
        };
        
        var franklinOddOneOut = new Session {
            Quiz = oddOneOutQuiz,
            User = franklin,
            Attempts = new List<Attempt> {
                new Attempt { Question = oddOneOutQ1, Option = oddOneOutQ1Correct },
                new Attempt { Question = oddOneOutQ2, Option = oddOneOutQ2Correct },
                new Attempt { Question = oddOneOutQ3, Option = oddOneOutQ3Wrong1 },
                new Attempt { Question = oddOneOutQ4, Option = oddOneOutQ4Correct },
                new Attempt { Question = oddOneOutQ5, Option = oddOneOutQ5Correct },
                new Attempt { Question = oddOneOutQ6, Option = oddOneOutQ6Correct },
                new Attempt { Question = oddOneOutQ7, Option = oddOneOutQ7Correct }
            }
        };
        
        var hankOddOneOut = new Session {
            Quiz = oddOneOutQuiz,
            User = hank,
            Attempts = new List<Attempt> {
                new Attempt { Question = oddOneOutQ1, Option = oddOneOutQ1Wrong1 },
                new Attempt { Question = oddOneOutQ2, Option = oddOneOutQ2Correct },
                new Attempt { Question = oddOneOutQ3, Option = oddOneOutQ3Correct },
                new Attempt { Question = oddOneOutQ4, Option = oddOneOutQ4Correct },
                new Attempt { Question = oddOneOutQ5, Option = oddOneOutQ5Correct },
                new Attempt { Question = oddOneOutQ6, Option = oddOneOutQ6Correct },
                new Attempt { Question = oddOneOutQ7, Option = oddOneOutQ7Correct }
            }
        };
        
        // -- web
        var aliceWeb = new Session {
            Quiz = webQuiz,
            User = alice,
            Attempts = new List<Attempt> {
                new Attempt { Question = webQ1, Option = webQ1Correct },
                new Attempt { Question = webQ2, Option = webQ2Correct },
                new Attempt { Question = webQ3, Option = webQ3Correct }
            }
        };
        
        var cathyWeb = new Session {
            Quiz = webQuiz,
            User = cathy,
            Attempts = new List<Attempt> {
                new Attempt { Question = webQ1, Option = webQ1Correct },
                new Attempt { Question = webQ2, Option = webQ2Wrong1 },
                new Attempt { Question = webQ3, Option = webQ3Correct }
            }
        };
        
        var emmaWeb = new Session {
            Quiz = webQuiz,
            User = emma,
            Attempts = new List<Attempt> {
                new Attempt { Question = webQ1, Option = webQ1Wrong2 },
                new Attempt { Question = webQ2, Option = webQ2Correct },
                new Attempt { Question = webQ3, Option = webQ3Correct }
            }
        };
        
        var franklinWeb = new Session {
            Quiz = webQuiz,
            User = franklin,
            Attempts = new List<Attempt> {
                new Attempt { Question = webQ1, Option = webQ1Correct },
                new Attempt { Question = webQ2, Option = webQ2Correct },
                new Attempt { Question = webQ3, Option = webQ3Correct }
            }
        };
        
        var hankWeb = new Session {
            Quiz = webQuiz,
            User = hank,
            Attempts = new List<Attempt> {
                new Attempt { Question = webQ1, Option = webQ1Correct },
                new Attempt { Question = webQ2, Option = webQ2Correct },
                new Attempt { Question = webQ3, Option = webQ3Correct }
            }
        };
        
        // -- sport
        var hankSport = new Session {
            Quiz = sportQuiz,
            User = hank,
            Attempts = new List<Attempt> {
                new Attempt { Question = sportQ1, Option = sportQ1Correct },
                new Attempt { Question = sportQ2, Option = sportQ2Correct },
                new Attempt { Question = sportQ3, Option = sportQ3Correct },
                new Attempt { Question = sportQ4, Option = sportQ4Correct }
            }
        };

        this._context.Sessions.Add(aliceSimpleMath);
        this._context.Sessions.Add(davidSimpleMath);
        this._context.Sessions.Add(emmaSimpleMath);
        this._context.Sessions.Add(franklinSimpleMath);
        this._context.Sessions.Add(aliceHelloWorld);
        this._context.Sessions.Add(bobHelloWorld);
        this._context.Sessions.Add(cathyHelloWorld);
        this._context.Sessions.Add(davidHelloWorld);
        this._context.Sessions.Add(emmaHelloWorld);
        this._context.Sessions.Add(franklinHelloWorld);
        this._context.Sessions.Add(ginaHelloWorld);
        this._context.Sessions.Add(bobOddOneOut);
        this._context.Sessions.Add(davidOddOneOut);
        this._context.Sessions.Add(franklinOddOneOut);
        this._context.Sessions.Add(hankOddOneOut);
        this._context.Sessions.Add(aliceWeb);
        this._context.Sessions.Add(cathyWeb);
        this._context.Sessions.Add(emmaWeb);
        this._context.Sessions.Add(franklinWeb);
        this._context.Sessions.Add(hankWeb);
        this._context.Sessions.Add(hankSport);

        this._context.SaveChanges();
    }
}
