<template>
  <form>
      <div class="help">
        <slot name="help">This is some help text.</slot>
      </div>
      <div class="fields">
        <slot name="fields">This is some fields.</slot>
      </div>
      <div class="buttons">
        <slot name="buttons">This is some buttons.</slot>
      </div>
      <slot></slot>
  </form>
</template>