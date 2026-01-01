<!--
  Sync Impact Report:
  Version change: None (initial version) → 1.0.0
  Modified principles: N/A (initial creation)
  Added sections:
    - Core Principles (4 principles)
    - Development Standards
    - Quality Gates
    - Governance
  Removed sections: N/A
  Templates requiring updates:
    ✅ plan-template.md (validated - Constitution Check section compatible)
    ✅ spec-template.md (validated - no conflicts)
    ✅ tasks-template.md (validated - TDD and testing principles align)
  Follow-up TODOs: None
-->

# Nitshift Site Constitution

## Core Principles

### I. Code Quality & Maintainability

Code MUST prioritize readability, maintainability, and adherence to established patterns. All code contributions MUST follow these non-negotiable standards:

- **Type Safety**: Use TypeScript/JSDoc type annotations for all functions, components, and data structures
- **Single Responsibility**: Each module, component, or function MUST have one clear purpose
- **DRY Principle**: Extract reusable logic into shared utilities; avoid duplication across components
- **Naming Conventions**: Use descriptive, intention-revealing names; prefer verbosity over brevity when clarity is at stake
- **Code Style**: Follow project prettier/linter configurations without exceptions
- **Documentation**: Complex logic MUST include explanatory comments; public APIs require JSDoc

**Rationale**: The Nitshift site serves as both a product showcase and development platform. Poor code quality creates technical debt that slows feature development and increases bug risk. Consistent, well-documented code enables team scalability and reduces onboarding friction.

### II. Testing Standards (NON-NEGOTIABLE)

All features MUST follow Test-Driven Development (TDD) principles. Tests are not optional—they are the specification.

- **Red-Green-Refactor**: Write failing tests → implement minimal passing code → refactor
- **Test Coverage**: New features MUST include unit tests for business logic and integration tests for user workflows
- **Component Testing**: Svelte components MUST have render tests and interaction tests for critical paths
- **API Contract Tests**: Backend endpoints MUST have contract tests validating request/response schemas
- **Performance Tests**: Features with performance requirements MUST include benchmark tests
- **No Implementation Without Tests**: Code review MUST reject implementation PRs lacking corresponding tests

**Rationale**: The Nitshift site operates in a production environment with real users. Untested code risks regressions, data corruption, and poor user experience. TDD ensures features work as specified before deployment and provides regression protection. Tests also serve as executable documentation of system behavior.

### III. User Experience Consistency

User-facing features MUST maintain visual, interaction, and performance consistency across the application.

- **Design System Adherence**: Use SMUI components and established theme tokens exclusively; no ad-hoc styling
- **Responsive Design**: All UI MUST function on mobile (375px), tablet (768px), and desktop (1920px) viewports
- **Accessibility (a11y)**: WCAG 2.1 AA compliance required—keyboard navigation, ARIA labels, color contrast ratios
- **Loading States**: All async operations MUST display loading indicators; no silent failures
- **Error Handling**: User-facing errors MUST provide actionable feedback; log technical details separately
- **Progressive Enhancement**: Core functionality MUST work without JavaScript; enhanced features are additive

**Rationale**: Nitshift's value proposition depends on a polished, professional user experience. Inconsistent UI patterns confuse users and damage brand credibility. Accessibility is both a legal requirement and moral imperative. Users expect instant feedback and clear error messages—silent failures erode trust.

### IV. Performance Requirements

Application performance directly impacts user engagement and conversion. All features MUST meet these benchmarks:

- **Page Load**: Initial page load (LCP) MUST be <2.5s on 3G connections
- **Interactivity**: Time to Interactive (TTI) MUST be <3.5s; First Input Delay (FID) <100ms
- **Bundle Size**: JavaScript bundles MUST stay under 250KB gzipped; use code splitting for routes
- **Image Optimization**: Use @sveltejs/enhanced-img for responsive images; lazy load below-the-fold content
- **API Response Time**: p95 latency for API calls MUST be <200ms; p99 <500ms
- **Database Queries**: No N+1 queries; use indexes for frequently queried fields; query time <50ms p95
- **Monitoring**: Performance regressions MUST be detected via Lighthouse CI in PR checks

**Rationale**: Performance is a feature, not an optimization phase. Slow sites lose users—47% abandon pages taking >3s to load. SEO rankings penalize slow sites. Performance degradation compounds over time without proactive monitoring. Setting benchmarks upfront prevents "performance debt" accumulation.

## Development Standards

### Code Review Requirements
- All PRs MUST pass automated checks (linting, type checking, tests, Lighthouse CI)
- At least one approving review required before merge
- PRs MUST link to feature spec or issue describing the "why"
- Breaking changes MUST include migration guide and deprecation warnings

### Branching & Versioning
- Feature branches follow `[###-feature-name]` pattern (e.g., `042-dark-mode-toggle`)
- Version bumps follow semantic versioning (MAJOR.MINOR.PATCH)
- Main branch is deployable at all times; no direct commits without PR

### Dependency Management
- New dependencies MUST be justified (security, bundle size impact, maintenance status)
- Pin exact versions in package.json; use lockfile for reproducibility
- Audit dependencies quarterly for security vulnerabilities

## Quality Gates

All features MUST pass these gates before production deployment:

1. **Constitution Compliance**: No violations of Core Principles I-IV without documented justification
2. **Test Suite**: 100% of new code paths covered; all tests passing
3. **Performance Budget**: Lighthouse scores ≥90 (Performance, Accessibility, Best Practices, SEO)
4. **Security Audit**: No high/critical vulnerabilities in dependencies; input validation on all user data
5. **Manual QA**: Quickstart/acceptance scenarios from feature spec verified in staging

## Governance

This constitution supersedes all other development practices. Amendments require:

1. **Proposal**: Document proposed change with rationale and impact analysis
2. **Review**: Team consensus (or product owner approval for urgent security/legal requirements)
3. **Migration Plan**: If existing code violates new principles, include refactoring timeline
4. **Version Bump**: Update constitution version following semantic versioning rules

**Enforcement**:
- All PRs MUST verify constitutional compliance during code review
- Complexity or principle deviations MUST be documented in `plan.md` Complexity Tracking section
- Unjustified violations result in PR rejection

**Agent Guidance**:
- Runtime development guidance for AI agents is maintained in repository root files (e.g., `CLAUDE.md`, `.github/copilot-instructions.md`)
- Agents MUST reference this constitution when generating implementation plans or code

**Version**: 1.0.0 | **Ratified**: 2025-10-06 | **Last Amended**: 2025-10-06
