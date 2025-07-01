# Changelog
Keep track of changes and upgrades to the API.

## 0.0.1 – 2025-06-30

### What’s new
- **Web Streams Support**: Added support for Web Streams APIs in both the Flight Client and Server for Node.js, enhancing the ability to consume streams in React applications.
- **Debug Channel**: Introduced a Debug Channel option for stateful connections to the backend in development mode, allowing on-demand data requests.

### Enhancements
- **Performance Tracking**: Improved performance tracking by ensuring performance entries are emitted only when profiling is active.
- **Component Tree Indentation**: Added a minimum indent size to the Component Tree in React DevTools to maintain visual hierarchy even in narrow views.
- **Debug Info Emission**: Enhanced debug info emission by writing partial debug info during render aborts, providing better insights into rendering issues.

### Bug fixes
- **Hydration Fixes**: Fixed hydration issues with `useId` in `SuspenseList`, ensuring proper state management during rendering.
- **Promise Serialization**: Resolved issues with serializing already resolved Promises as debug models, ensuring accurate representation in logs.
- **Error Handling**: Improved error messages for hoisting violations and invalid mutations, providing clearer guidance for developers.

### Breaking changes
- **Context Renaming**: Renamed `ReactFizzContext` to `ReactFizzLegacyContext` for clarity, aligning with the updated context API.

#### Upgrade
1. Update your dependencies to the latest version.
2. Review the breaking changes and adjust your code accordingly.
3. Test your application thoroughly to ensure compatibility with the new version.

## 0.0.0 – 2025-06-29

### What’s new
- **Attribute Configuration**: Aligned `AttributeConfiguration` type in `ReactNativeTypes` for better type safety.
- **Debug Info Improvements**: Enhanced the handling of debug information for async operations, improving the reliability of debugging outputs.

### Enhancements
- **Performance Logs**: Prevented replay of performance logs when `replayConsoleLogs` is set to false, optimizing console output.
- **Component Props Tracking**: Included component props in performance tracking, allowing for more detailed performance analysis.

### Bug fixes
- **Dead Code Removal**: Restored previously removed dead code in WWW JS to maintain functionality.
- **Cycle Resolution**: Fixed issues with resolving deep cycles in the rendering process, improving stability during complex renders.

### Deprecations
- **Feature Flags**: Removed the feature flag `enableRenderableContext`, as the feature is now fully rolled out.

#### Upgrade
1. Ensure your codebase is compatible with the new context API changes.
2. Update any references to deprecated features in your application.
3. Run your test suite to verify that all tests pass with the new changes.