# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

>I have changed CommonJS modules to ES modules. CommonJS imports are dynamically resolved at runtime rather than parse time. Old code is very confusing to the reader, it is jumbled sequence of operation.
> In my refactored code we can clearly understand step by step flow. if input not passed default value will get returned, also if input having partition key same key can be deterministic key if it is string and it's length not more than MAX_PARTITION_KEY_LENGTH.

    